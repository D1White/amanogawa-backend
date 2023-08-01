import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'api/user/dto/create-user.dto';
import { Cookies, UserId } from 'decorators';
import { Response } from 'express';
import { AccessTokenGuard, LocalAuthGuard, RefreshTokenGuard } from 'guards';
import { REFRESH_TOKEN_COOKIE } from 'utils/constants';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(req.user);
    res.cookie(REFRESH_TOKEN_COOKIE, tokens.refresh_token, { httpOnly: true });
    return tokens;
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.register(dto);
    res.cookie(REFRESH_TOKEN_COOKIE, tokens.refresh_token, { httpOnly: true });
    return tokens;
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@UserId() id: string, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(id);
    res.clearCookie(REFRESH_TOKEN_COOKIE);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @Cookies(REFRESH_TOKEN_COOKIE) refreshToken: string,
    @UserId() id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refresh(id, refreshToken);
    res.cookie(REFRESH_TOKEN_COOKIE, tokens.refresh_token, { httpOnly: true });
    return tokens;
  }
}
