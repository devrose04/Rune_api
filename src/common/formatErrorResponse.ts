import { IApiContract } from '../types/IApiContract';

export const formatErrResponse = <E extends Error>(e: E): IApiContract<undefined> => {
  return {
    statusCode: (e as any).code ?? 500,
    errors: [
      {
        message: e.message,
      },
    ],
    body: undefined,
  };
};
