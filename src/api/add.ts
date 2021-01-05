import { Fn } from '../types/Fn';
import { AddSchema } from '../schemas/AddSchema';
import { AddResponse } from '../types/AddResponse';
import { execute } from '../common/execute';
import { IApiContract } from '../types/IApiContract';

export const add: Fn<typeof AddSchema, IApiContract<AddResponse>> = (input) => {
  return execute([AddSchema, input], async () => {
    const response = {
      id: 'Boom, lambda.',
    };

    return response;
  });
};
