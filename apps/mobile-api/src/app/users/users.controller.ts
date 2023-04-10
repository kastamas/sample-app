import {
  ControllerWithDocs,
  GetWithDocs,
  PostWithDocs,
  PutWithDocs,
} from '@flexypw/backend-core';
import { JwtSecurity, User } from '@flexypw/auth';
import { UserModel } from '@business-loyalty-program/database';
import { Body, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UsersResponseDto,
  UserUpdateMobileDto,
  SignupUserDto,
} from '@business-loyalty-program/types';

@ControllerWithDocs('/users', 'Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GetWithDocs('/current', UsersResponseDto)
  @JwtSecurity()
  public getCurrent(@User() user: UserModel) {
    return user;
  }

  @PutWithDocs('/current', UsersResponseDto)
  @JwtSecurity()
  public updateCurrent(
    @User() user: UserModel,
    @Body() body: UserUpdateMobileDto
  ) {
    return this.usersService.updateUser(user, body);
  }

  @PutWithDocs('/current/signup', UsersResponseDto)
  @JwtSecurity()
  public signUp(@User() user: UserModel, @Body() body: SignupUserDto) {
    if (user.isRegistered) {
      throw new ForbiddenException();
    }

    return this.usersService.signUpUser(user, body);
  }

  @PostWithDocs('/current/signout')
  @JwtSecurity()
  public signOut(@User() user: UserModel) {
    return this.usersService.signOutUser(user);
  }
}
