export type SerializedApiError = {
  statusCode: number;
  code: string;
  description: string;
};

export class ApiError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly description: string;

  constructor({ statusCode, code, description }: SerializedApiError) {
    super(description);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
    this.description = description;

    Object.setPrototypeOf(this, new.target.prototype);
    (this as any).cause = { statusCode, code, description };
  }

  static async fromResponse(res: Response): Promise<ApiError> {
    let payload: Partial<SerializedApiError> = {};

    payload = await res.json();

    return new ApiError({
      statusCode: payload.statusCode ?? res.status,
      code: payload.code ?? "unknown_error",
      description: payload.description ?? (res.statusText || "Request failed"),
    });
  }

  toJSON(): SerializedApiError {
    return {
      statusCode: this.statusCode,
      code: this.code,
      description: this.description,
    };
  }
}

export function isSerializedApiError(err: unknown): err is SerializedApiError {
  return (
    typeof err === "object" &&
    err !== null &&
    "statusCode" in err &&
    "code" in err &&
    "description" in err
  );
}

export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}
