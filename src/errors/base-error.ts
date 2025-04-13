import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseError extends HttpException {
  constructor(
    public readonly clientMessage: string,
    public readonly internalMessage?: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(clientMessage, statusCode);
    this.internalMessage = internalMessage || clientMessage;
  }
}
