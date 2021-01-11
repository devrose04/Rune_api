import { ICustomError } from '../types/ICustomError';
import { IFormattedError } from '../types/IFormattedError';

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
