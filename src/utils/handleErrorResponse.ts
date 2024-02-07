import {
  BadRequestException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

export function handleErrorResponse(error: unknown, res: Response) {
  if (error instanceof BadRequestException) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
  }
  if (error instanceof NotFoundException) {
    return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
  }
  if (error instanceof UnauthorizedException) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
  }
  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: 'Something went wrong' });
}
