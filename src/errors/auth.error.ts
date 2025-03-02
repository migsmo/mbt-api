export class SupabaseInitializationError extends Error {
  constructor(error: string) {
    super('Failed to initialize a supabase client.' + error);
    this.name = 'SupabaseInitializationError';
  }
}
