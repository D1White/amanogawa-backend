import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'api/user/dto/create-user.dto';
import { UserId } from 'decorators';
import { AccessTokenGuard, LocalAuthGuard, RefreshTokenGuard } from 'guards';

import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@UserId() id: string) {
    return this.authService.logout(id);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@UserId() id: string, @Body() { refresh_token }: RefreshTokenDto) {
    return this.authService.refresh(id, refresh_token);
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
