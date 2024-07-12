export class HttpError extends Error {
  code: number;

  constructor(message: string, errorCode: number) {
      super(message);
      this.code = errorCode;
      // Set the prototype explicitly to preserve the stack trace
      // Object.setPrototypeOf(this, HttpError.prototype);
  }
}

