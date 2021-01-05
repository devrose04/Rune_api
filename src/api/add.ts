import { Fn } from '../types/Fn';
import { AddSchema, isAddSchemaValid } from '../schemas/AddSchema';
import { AddResponse } from '../types/AddResponse';
import { executor } from '../executor';
import { IApiContract } from '../types/IApiContract';

export const add: Fn<typeof AddSchema, IApiContract<AddResponse>> = (input) => {
  return executor<AddResponse>(async () => {
    if (!isAddSchemaValid(input)) {
      throw new Error('Input does not match the defined API schema.');
    }

    const response = {
      id: 'Boom, lambda.',
    };

    return response;
  });
};
