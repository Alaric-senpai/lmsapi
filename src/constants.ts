import { ForbiddenException } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from 'generated/prisma/runtime/library';

export const GeneralErrorHandler = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    return {
      ...error,
    };
  }

  if (error instanceof PrismaClientValidationError) {
    // return {
    //   message: 'Validation error occurred',
    //   name: error.name,
    //   source: error?.stack,
    // };
    throw new ForbiddenException({
      message: 'Validation error detected',
      name: error.name,
    });
  }
};
