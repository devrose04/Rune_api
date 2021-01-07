import { formatErrResponse } from './formatErrorResponse';
import { IApiContract } from '../types/IApiContract';
import isError from 'lodash.iserror';

export const processError = (e: unknown): IApiContract<undefined> => {
  console.log('----------------------------');
  console.log(isError(e));
  console.log('----------------------------');

  if (isError(e)) {
    return formatErrResponse(e);
  } else {
    return formatErrResponse(new Error('Could not handle a thrown exception.'));
  }
};
