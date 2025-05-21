export type ElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export interface ApiResponse<T> {
  isSuccess: boolean;
  errorCode: string | null;
  statusCode: number;
  message: string;
  devMessage: string | null;
  exceptionStackTrace: string | null;
  data: T;
}
