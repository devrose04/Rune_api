import { Handler } from 'aws-lambda';

export const add: Handler = async (event) => {
  const response = {
    statusCode: 200,
    body: {
      message: 'Boom, lambda.',
      input: event,
    },
  };

  return response;
};
