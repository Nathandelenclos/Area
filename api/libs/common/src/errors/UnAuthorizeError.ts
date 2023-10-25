export class UnAuthorizeError extends Error {
  message: string;

  constructor() {
    super('Unauthorized');
  }
}
