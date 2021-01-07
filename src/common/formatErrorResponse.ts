import { IApiContract } from '../types/IApiContract';

interface IError extends Error {
  code?: number;
}

export const formatErrResponse = <E extends IError>(e: E): IApiContract<undefined> => {
  return {
    statusCode: e.code ?? 500,
    errors: [
      {
        message: e.message,
      },
    ],
    body: undefined,
  };
};
