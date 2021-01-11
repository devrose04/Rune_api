export interface IFormattedError {
  errorType: string;
  httpStatus: number;
  data: unknown;
  requestId: string;
  message: string;
  stack?: string;
}
