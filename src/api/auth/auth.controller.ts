import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'api/user/dto/create-user.dto';
import { Cookies, UserId } from 'decorators';
import { Response } from 'express';
import { AccessTokenGuard, LocalAuthGuard, RefreshTokenGuard } from 'guards';
import { clearAuthCookies, setAuthCookies } from 'utils';
import { REFRESH_TOKEN_COOKIE } from 'utils/constants';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(req.user);
    setAuthCookies(tokens, res);
    return tokens;
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.register(dto);
    setAuthCookies(tokens, res);
    return tokens;
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@UserId() id: string, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(id);
    clearAuthCookies(res);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @Cookies(REFRESH_TOKEN_COOKIE) refreshToken: string,
    @UserId() id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refresh(id, refreshToken);
    setAuthCookies(tokens, res);
    return tokens;
  }

  @Get('username/:username')
  async validateUsername(@Param('username') username: string) {
    return this.authService.validateUsername(username);
  }

  @Get('email/:email')
  async validateEmail(@Param('email') email: string) {
    return this.authService.validateEmail(email);
  }
}
