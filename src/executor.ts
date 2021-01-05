import { formatResponse } from './formatResponse';
import { processError } from './processError';
import { IApiContract } from './types/IApiContract';

/**
 * Execute a function and return from the API in a consistent way.
 */
export const executor = <T>(fn: () => T) => {
  try {
    return formatResponse(fn());
  } catch (e: unknown) {
    return processError(e);
  }
};
