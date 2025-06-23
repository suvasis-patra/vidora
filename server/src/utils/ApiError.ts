class ApiError extends Error {
  statusCode: number;
  success: boolean;
  errors: string[];
  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: string[] = [],
    stack = ""
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors.length > 0 ? errors : [message];
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
