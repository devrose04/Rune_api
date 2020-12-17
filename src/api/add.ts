import { Handler } from 'aws-lambda';

export const add: Handler = async (event) => {
  console.log('----------------------------');
  console.log('test');
  console.log('----------------------------');

  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  return response;
};
