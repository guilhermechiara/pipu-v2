import { Injectable } from "@nestjs/common";
import { WorkOSError, WorkOSErrorCode } from "@app/modules/auth/types/workos";
import { Exception } from "@app/common/exceptions/exception";
import { OneTimeCodePreviouslyUsedException } from "@app/modules/auth/exceptions/one-time-code-previously-used.exception";
import { InvalidOneTimeCodeException } from "@app/modules/auth/exceptions/invalid-one-time-code.exception";
import { OneTimeCodeExpiredException } from "@app/modules/auth/exceptions/one-time-code-expired.exception";

const errorMap: Record<WorkOSErrorCode, () => Exception> = {
  one_time_code_previously_used: () => new OneTimeCodePreviouslyUsedException(),
  invalid_one_time_code: () => new InvalidOneTimeCodeException(),
  one_time_code_expired: () => new OneTimeCodeExpiredException(),
};

@Injectable()
export class WorkOSErrorsMapper {
  /**
   * Maps a WorkOS error to the corresponding application exception if the error is a WorkOS error,
   * otherwise returns the original error.
   *
   * @param {unknown} error - The error to potentially map
   * @returns {unknown} The mapped exception or the original error
   */
  mapIfWorkOSError(error: unknown): unknown {
    if (this.isWorkOSError(error)) {
      return this._fromWorkOS(error);
    }
    return error;
  }

  /**
   * Maps a WorkOS error to the corresponding application exception.
   *
   * @param {WorkOSError} workOSError - The WorkOS error to map
   * @returns {Exception} The corresponding application exception
   * @throws {Error} If the WorkOS error code is not mapped
   */
  private _fromWorkOS(workOSError: WorkOSError): Exception {
    const errorFactory = errorMap[workOSError.rawData.code];

    if (!errorFactory) {
      throw new Error(
        `Unmapped WorkOS error code: ${workOSError.rawData.code}. Message: ${workOSError.message}`,
      );
    }

    return errorFactory();
  }

  /**
   * Type guard to check if an error is a WorkOS error.
   *
   * @param {unknown} error - The error to check
   * @returns {error is WorkOSError} True if the error is a WorkOS error
   */
  private isWorkOSError(error: unknown): error is WorkOSError {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      "rawData" in error &&
      typeof (error as any).rawData === "object" &&
      "code" in (error as any).rawData
    );
  }
}
