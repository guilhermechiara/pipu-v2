import { ErrorCode } from "@pipu/api";

export interface ExceptionProps {
  description: string;
  code: ErrorCode;
}

export class Exception extends Error {
  constructor(private readonly _exceptions: ExceptionProps | ExceptionProps[]) {
    super(
      JSON.stringify(
        Array.isArray(_exceptions)
          ? _exceptions.map((e) => ({
              code: e.code,
              description: e.description,
            }))
          : { code: _exceptions.code, description: _exceptions.description },
      ),
    );
  }

  get errors() {
    return this._exceptions;
  }
}
