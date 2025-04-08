import { BaseError } from './base-error';

export class SupabaseInitializationError extends BaseError {
  constructor(error: string) {
    super('Initialization error' + error);
  }
}
