import { IError } from './IError';

export interface IApiContract<S> {
  statusCode: number;
  body?: S;
  error?: IError;
}
