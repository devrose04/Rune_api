import { Fn } from '../types/Fn';
import { AddSchema } from '../schemas/AddSchema';
import { AddResponse } from '../types/AddResponse';
import { execute } from '../common/execute';

export const add: Fn<typeof AddSchema> = async (input, ctx) => {
  return execute<AddResponse>([AddSchema, input, ctx], async () => {
    const response = {
      id: 'Boom, lambda.',
    };

    return response;
  });
};
