import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserId } from 'decorators/user-id.decorator';
import { AccessTokenGuard } from 'guards';

import { FavoritesDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  getMe(@UserId() id: string) {
    return this.userService.findById(id, true);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Post('/favorites/add')
  @UseGuards(AccessTokenGuard)
  addAnimeToFavorites(@UserId() id: string, @Body() favoritesDto: FavoritesDto) {
    return this.userService.addAnimeToFavorites(id, favoritesDto.anime_id);
  }

  @Post('/favorites/remove')
  @UseGuards(AccessTokenGuard)
  removeAnimeFromFavorites(@UserId() id: string, @Body() favoritesDto: FavoritesDto) {
    return this.userService.removeAnimeFromFavorites(id, favoritesDto.anime_id);
  }
}
