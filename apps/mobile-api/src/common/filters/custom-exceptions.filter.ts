import {
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@flexypw/backend-core';
import { EDatabaseErrorCode } from '@flexypw/database';

export class CustomExceptionsFilter extends BaseExceptionFilter {
  public customHandler(exception: any): HttpException {
    if (
      exception.code === EDatabaseErrorCode.NotFound ||
      exception.name === 'EntityNotFound'
    ) {
      return new NotFoundException();
    }

    if (exception.code === EDatabaseErrorCode.UniqueViolation) {
      return new ConflictException();
    }
  }
}
