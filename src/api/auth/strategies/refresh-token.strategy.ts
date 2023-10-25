import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'api/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(private readonly userService: UserService) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
    });
  }

  async validate(payload?: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { id: user._id, username: user.username };
  }
}
