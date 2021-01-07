import { IApiContract } from '../types/IApiContract';

export const formatResponse = <B>(body: B): IApiContract => {
  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
};
