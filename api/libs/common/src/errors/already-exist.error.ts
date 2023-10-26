export class AlreadyExistError extends Error {
  constructor(message?: string) {
    super(message || 'Already Exist');
  }
}
