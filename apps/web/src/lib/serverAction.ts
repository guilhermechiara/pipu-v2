import {
  isApiError,
  isSerializedApiError,
  SerializedApiError
} from "./apiError";
import { ERROR_CODES } from "@pipu/api";

export type ServerActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: SerializedApiError };

export function isServerActionResult<T>(
  result: unknown
): result is ServerActionResult<T> {
  return (
    typeof result === "object" &&
    result !== null &&
    "ok" in result &&
    "data" in result &&
    "error" in result
  );
}

export function makeServerAction<I, O>(
  fn: (input: I) => Promise<ServerActionResult<O>>
) {
  return async (input: I): Promise<ServerActionResult<O>> => {
    try {
      return fn(input);
    } catch (err) {
      if (isApiError(err)) {
        return { ok: false, error: err.toJSON() };
      }

      if (isSerializedApiError(err)) {
        return { ok: false, error: err };
      }

      return {
        ok: false,
        error: {
          code: ERROR_CODES.GENERIC.UNKNOWN_ERROR,
          description: `Unknown error`,
          statusCode: 500
        }
      };
    }
  };
}
