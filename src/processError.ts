import { formatErrResponse } from './formatErrorResponse';
import { IApiContract } from './types/IApiContract';
import { isError } from './isError';

export const processError = (e: unknown): IApiContract<undefined> => {
  if (isError(e)) {
    return formatErrResponse(e);
  } else {
    return formatErrResponse(new Error('Could not handle a thrown exception.'));
  }
};
