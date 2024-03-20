import type { InputPayload, Payload } from './errors.type';

export class ValidationError extends Error {
  payload: Payload;

  constructor(message: string, payload: Payload = {}) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
    this.payload = payload;
    if (payload.stack) {
      this.stack = payload.stack;
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack,
        payload: this.payload,
      },
    };
  }
}

export class PermissionError extends Error {
  payload: Payload;

  constructor(message: string, payload: Payload = {}) {
    super(message);
    this.name = 'PermissionError';
    this.message = message;
    this.payload = payload;
    if (payload.stack) {
      this.stack = payload.stack;
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack,
        payload: this.payload,
      },
    };
  }
}

export class ApiError extends Error {
  payload: Payload;

  constructor(message: string, payload: Payload = {}) {
    super(message);
    this.name = 'ApiError';
    this.message = message;
    this.payload = payload;
    if (payload.stack) {
      this.stack = payload.stack;
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack,
        payload: this.payload,
      },
    };
  }
}

export class PropertyError extends Error {
  payload: InputPayload;

  constructor(message: string, payload: InputPayload = {}) {
    super(message);
    this.name = 'PropertyError';
    this.message = message;
    this.payload = payload;
  }

  toJSON(): Record<string, unknown> {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack,
        payload: this.payload,
      },
    };
  }
}

export class FatalError extends Error {
  payload: Payload;

  constructor(message: string, payload: Payload = {}) {
    super(`Fatal error: ${message}`);
    this.name = 'FatalError';
    this.message = message;
    this.payload = payload;
    if (payload.stack) {
      this.stack = payload.stack;
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack,
        payload: this.payload,
      },
    };
  }
}

export type Errors = Error | PermissionError | ApiError | ValidationError | FatalError | null;
export type ExtendedError = FatalError | ApiError | PermissionError | ValidationError;

export function isExtendedError(e: unknown): e is ExtendedError {
  return (
    e instanceof FatalError ||
    e instanceof ApiError ||
    e instanceof PermissionError ||
    e instanceof ValidationError
  );
}

export function unknownToError(rawError: unknown): Error | ExtendedError {
  if (isExtendedError(rawError)) return rawError;
  if (rawError instanceof Error) return rawError;
  if (typeof rawError === 'string') return new Error(rawError);

  return new Error('unknown Error with no message, stack and payload');
}
