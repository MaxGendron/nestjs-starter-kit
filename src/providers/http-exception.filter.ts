import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
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

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(
      `Error when executing route ${path}. Status: ${status}. Name: ${exception.name}.`,
    );
    console.log(`Stack trace: ${exception.stack}.`);

    response.status(status).send(exception.getResponse());
  }
}