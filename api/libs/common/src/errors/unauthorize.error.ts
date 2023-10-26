export class UnauthorizeError extends Error {
  message: string;

  constructor() {
    super('Unauthorized');
  }
}
