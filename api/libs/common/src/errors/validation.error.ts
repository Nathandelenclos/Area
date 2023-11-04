export class ValidationError<T> extends Error {
  fields: T[];
  constructor(fields: T[], message?: string) {
    super((message || 'Validation Error: ') + fields.join(', '));
    this.fields = fields;
  }
}
