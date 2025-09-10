import { PipeTransform } from "@nestjs/common";
import { z, ZodError } from "zod";
import { RequestValidationException } from "@app/common/exceptions/request-validation.exception";
import { ExceptionProps } from "@app/common/exceptions/exception";
import { ERROR_CODES } from "@pipu/api";

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodSchema) {}

  transform(value: unknown) {
    try {
      const input = value ?? {};
      return this.schema.parse(input);
    } catch (exception) {
      if (exception instanceof ZodError) {
        const error = exception.issues.map<ExceptionProps>((error) => ({
          code: ERROR_CODES.HTTP.BAD_REQUEST,
          description: `${error.path.join(".")} ${error.message}`,
        }))[0];

        throw new RequestValidationException(error);
      }

      throw new RequestValidationException({
        code: ERROR_CODES.GENERIC.UNKNOWN_ERROR,
        description: `Validation has failed, please contact the support`,
      });
    }
  }
}
