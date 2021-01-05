import { formatResponse } from './formatResponse';
import { processError } from './processError';

/**
 * Execute a function and return from the API in a consistent way.
 */
export const executor = async <T = any>(fn: () => Promise<T>) => {
  try {
    return formatResponse(await fn());
  } catch (e: unknown) {
    return processError(e);
  }
};
