import { IApiContract } from '../types/IApiContract';

export const formatResponse = <B>(body: B): IApiContract<B> => {
  return {
    statusCode: (body as any).code ?? 200,
    error: undefined,
    body,
  };
};
