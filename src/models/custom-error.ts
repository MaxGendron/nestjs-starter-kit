import { HttpStatus } from '@nestjs/common';

export class CustomError {
  constructor(
    public statusCode: HttpStatus,
    public name: string,
    public message: string,
  ) {}
}
