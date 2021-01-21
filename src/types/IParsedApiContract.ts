import { IApiContract } from './IApiContract';
import { IFormattedError } from './IFormattedError';

export interface IParsedApiContract<T = unknown>
  extends Omit<IApiContract, 'body'> {
  statusCode: number;
  body?: T | IFormattedError;
}
