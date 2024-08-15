export class ValidationError extends Error {
  public errors: { path: (string | number)[]; message: string }[];

  constructor(errors: { path: (string | number)[]; message: string }[]) {
    super('Validation Error');
    this.name = 'ValidationError';
    this.errors = errors;
  }
}
