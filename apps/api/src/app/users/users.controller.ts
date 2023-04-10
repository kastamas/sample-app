import {
  ClassSerializerInterceptor,
  Controller,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetWithDocs } from '@flexypw/backend-core';
import { JwtSecurity } from '@flexypw/auth';
import {
  UsersCollectionDto,
  UsersCollectionQueryDto,
  UsersResponseDto,
} from '@business-loyalty-program/types';
import { UsersService } from './users.service';

@Controller()
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GetWithDocs('/users', UsersCollectionDto)
  @JwtSecurity()
  @UseInterceptors(ClassSerializerInterceptor)
  public getCompanyUsers(@Query() query: UsersCollectionQueryDto) {
    return this.usersService.getCollection(query);
  }

  @GetWithDocs('/users/:id', UsersResponseDto)
  @JwtSecurity()
  public getCompanyUser(@Param('id') id: string) {
    return this.usersService.getSingle(id);
  }
}
