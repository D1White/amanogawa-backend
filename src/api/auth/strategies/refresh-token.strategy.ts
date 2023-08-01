import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'api/user/user.service';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { REFRESH_TOKEN_COOKIE } from 'utils/constants';

import { JwtPayload } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(private readonly userService: UserService) {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies?.[REFRESH_TOKEN_COOKIE];
          return data || null;
        },
      ]),
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
