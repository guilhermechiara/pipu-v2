export type WorkOSError = {
  message: string;
  rawData: {
    code: WorkOSErrorCode;
    message: string;
  };
};

export type WorkOSErrorCode =
  | "one_time_code_previously_used"
  | "invalid_one_time_code"
  | "one_time_code_expired";
