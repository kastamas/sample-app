import {
  Body,
  Controller,
  ParseArrayPipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PostWithDocs } from '@flexypw/backend-core';
import { IntegrationSecurity } from '../../common/guards/integration-auth.guard';
import { UserRepository } from '@business-loyalty-program/database';
import { ApiBody } from '@nestjs/swagger';
import { UserSyncDto } from '@business-loyalty-program/types';
import { parsePhoneNumber } from 'libphonenumber-js';

@Controller()
export class UsersController {
  constructor(private readonly userRepository: UserRepository) {}

  @PostWithDocs('/users')
  @IntegrationSecurity()
  @ApiBody({ type: [UserSyncDto] })
  public async getUser(
    @Body(new ParseArrayPipe({ items: UserSyncDto })) body: UserSyncDto[]
  ) {
    const formattedData = body.map((item) => {
      try {
        const phoneNumber = parsePhoneNumber(item.phone, 'RU');

        return {
          ...item,
          phone: phoneNumber.number.toString(),
        };
      } catch (err) {
        throw new UnprocessableEntityException({
          message: 'Incorrect phone number',
        });
      }
    });
    await this.userRepository.bulkUpsert(formattedData);
  }
}
