import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';

/*
  Catching exception to add logging & custom status
*/
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const path = request.url;

    Logger.error(
      `Error when executing route ${path}. Status: ${exception.getStatus()}. Name: ${exception.name}.`,
    );
    Logger.error(`Stack trace: ${exception.stack}.`);

    response.status(status).send(exception.getResponse());
  }
}