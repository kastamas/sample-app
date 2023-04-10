import { ControllerWithDocs, PostWithDocs } from '@flexypw/backend-core';
import { TokenResponseDto } from '@flexypw/auth';
import { Body } from '@nestjs/common';
import {
  AuthWithCodeDto,
  CreateCodeDto,
  CreateCodeResponseDto,
} from '@business-loyalty-program/types';
import { PhoneAuthService } from './services/phone-auth.service';

@ControllerWithDocs('/auth', 'Authentication')
export class AuthController {
  constructor(private readonly phoneAuthService: PhoneAuthService) {}

  @PostWithDocs('/code', CreateCodeResponseDto)
  public async createCode(@Body() { cardNumber }: CreateCodeDto) {
    return await this.phoneAuthService.createCode(cardNumber);
  }

  @PostWithDocs('/code/users', TokenResponseDto)
  public authWithCode(@Body() body: AuthWithCodeDto) {
    return this.phoneAuthService.auth(body);
  }
}
