import { ErrorCode } from "@pipu/api";

export interface ExceptionProps {
  description: string;
  code: ErrorCode;
}

export class Exception extends Error {
  private readonly _description: string;
  private readonly _code: ErrorCode;

  constructor(_exception: ExceptionProps) {
    super(
      JSON.stringify({
        code: _exception.code,
        description: _exception.description,
      }),
    );

    this._code = _exception.code;
    this._description = _exception.description;
  }

  get description() {
    return this._description;
  }

  get code() {
    return this._code;
  }
}
