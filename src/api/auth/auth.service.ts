import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'api/user/dto/create-user.dto';
import { UserService } from 'api/user/user.service';
import { compare } from 'bcrypt';
import { SecureUser, UserDocument } from 'schemas/user.schema';

import { AuthTokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<SecureUser> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const match = await compare(pass, user.password);

    if (match) {
      user.password = undefined;
      return user;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    const userData = await this.userService.create(dto);

    if (!userData) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const tokens = await this.getTokens(userData._id, userData.username);
    await this.userService.updateRefreshToken(userData._id, tokens.refresh_token);
    return tokens;
  }

  async login(user: UserDocument) {
    const tokens = await this.getTokens(user._id, user.username);
    await this.userService.updateRefreshToken(user._id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    return this.userService.updateRefreshToken(userId, '');
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);

    if (!user || !user.refresh_token) throw new ForbiddenException('Access Denied');

    if (refreshToken !== user.refresh_token) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.username);
    await this.userService.updateRefreshToken(user._id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(id: string, username: string): Promise<AuthTokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          username,
        },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '30m',
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          username,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '30d',
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async validateUsername(username: string) {
    const user = await this.userService.findByUsername(username);
    return !user;
  }

  async validateEmail(email: string) {
    const user = await this.userService.findByEmail(email);
    return !user;
  }
}
