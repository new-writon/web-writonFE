export interface ErrorData {
  code: number;
  message: string;
}

export class CustomError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}
