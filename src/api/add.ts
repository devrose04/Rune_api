import { Fn } from '../types/Fn';
import { AddSchema } from '../schemas/AddSchema';
import { AddResponse } from '../types/AddResponse';
import { execute } from '../common/execute';

export const add: Fn = async (event, ctx) => {
  return execute<AddResponse>([AddSchema, event, ctx], async () => {
    const response = {
      id: 'Boom, lambda.',
    };

    return response;
  });
};
