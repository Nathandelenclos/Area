export class ValidationError<T> extends Error {
  fields: T[];
  constructor(fields: T[]) {
    super('Validation Error: ' + fields.join(', '));
    this.fields = fields;
  }
}
