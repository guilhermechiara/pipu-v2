import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
} from "@nestjs/common";
import { Response } from "express";
import { Exception } from "../exceptions/exception";
import { NotFoundException } from "../exceptions/not-found.exception";
import { RequestValidationException } from "../exceptions/request-validation.exception";
import { ValidationException } from "../exceptions/validation.exception";
import { DomainViolationException } from "../exceptions/domain-violation.exception";
import { DuplicateEntityException } from "../exceptions/duplicate-entity.exception";
import { ForbiddenException } from "../exceptions/forbidden.exception";
import { NotAuthorizedException } from "@app/common/exceptions/not-authorized.exception";

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  catch(exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode: number;

    console.error(exception);

    if (exception instanceof NotFoundException) {
      statusCode = 404;
    } else if (
      exception instanceof RequestValidationException ||
      exception instanceof ValidationException
    ) {
      statusCode = 400;
    } else if (exception instanceof DomainViolationException) {
      statusCode = 422;
    } else if (exception instanceof DuplicateEntityException) {
      statusCode = 409;
    } else if (exception instanceof ForbiddenException) {
      statusCode = 403;
    } else if (exception instanceof NotAuthorizedException) {
      statusCode = 401;
    } else {
      response.status(500).json({
        statusCode: 500,
        code: "internal_server_error",
        description: "Internal Server Error",
      });

      return;
    }

    response.status(statusCode).json({
      statusCode: statusCode,
      code: exception.code,
      description: exception.description,
    });
  }
}
