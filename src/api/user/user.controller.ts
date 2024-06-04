import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserId } from 'decorators/user-id.decorator';
import { AccessTokenGuard } from 'guards';

import { FavoritesDto, FollowDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  getMe(@UserId() id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // Favorites

  @Get('/favorites')
  @UseGuards(AccessTokenGuard)
  favorites(@UserId() id: string) {
    return this.userService.getFavorites(id);
  }

  @Get('/favorites/:username')
  publicUserFavorites(@Param('username') username: string) {
    return this.userService.getPublicUserFavorites(username);
  }

  @Post('/favorites/add')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  addAnimeToFavorites(@UserId() id: string, @Body() favoritesDto: FavoritesDto) {
    this.userService.addAnimeToFavorites(id, favoritesDto.anime_id);
  }

  @Post('/favorites/remove')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAnimeFromFavorites(@UserId() id: string, @Body() favoritesDto: FavoritesDto) {
    this.userService.removeAnimeFromFavorites(id, favoritesDto.anime_id);
  }

  // Public user

  @Get(':username')
  publicUser(@Param('username') username: string) {
    return this.userService.getPublicUser(username);
  }

  // Follow

  @Get(':username/followers')
  followers(@Param('username') username: string) {
    return this.userService.getFollowers(username);
  }

  @Get(':username/followings')
  followings(@Param('username') username: string) {
    return this.userService.getFollowings(username);
  }

  @Post('/follow')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  follow(@UserId() id: string, @Body() followDto: FollowDto) {
    this.userService.follow(id, followDto.following);
  }

  @Post('/unfollow')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  unfollow(@UserId() id: string, @Body() followDto: FollowDto) {
    this.userService.unfollow(id, followDto.following);
  }
}
