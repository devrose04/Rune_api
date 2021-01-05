import { ErrorObject } from 'ajv';
import { IError } from './IError';

export interface IApiContract<S> {
  statusCode: number;
  errors: Array<IError | ErrorObject>;
  body?: S;
}
