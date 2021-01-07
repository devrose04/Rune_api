import { ICustomError } from '../types/ICustomError';

interface IFormattedError {
  errorType: string;
  httpStatus: number;
  data: unknown;
  requestId: string;
  message: string;
  stack?: string;
}

export const formatErrResponse = ({
  name,
  code,
  data,
  requestId,
  message,
  stack,
}: ICustomError): IFormattedError => {
  return {
    errorType: name,
    httpStatus: code,
    data,
    requestId,
    message,
    stack,
  };
};
