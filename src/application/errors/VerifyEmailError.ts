export class VerifyEmailError extends Error {
  public isOperational: boolean;

  constructor(message: string, isOperational: boolean = true) {
    super(message);
    this.isOperational = isOperational;

    this.name = this.constructor.name;
  }
}
