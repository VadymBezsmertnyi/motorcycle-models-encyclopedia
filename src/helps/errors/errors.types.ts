import type {
  ApiError,
  FatalError,
  PermissionError,
  ValidationError,
} from "./errors";

export type InputPayload = {
  field?: string;
};

export type Payload = {
  code?: number;
  data?: unknown;
  stack?: string;
};

export type ErrorType =
  | (Error & {
      payload?: Payload;
    })
  | FatalError
  | ValidationError
  | PermissionError
  | ApiError;
