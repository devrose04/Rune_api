export interface ICustomError extends Error {
  code?: number;
  requestId: string;
  data?: unknown;
}
