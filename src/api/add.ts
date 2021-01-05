import { Fn } from '../types/Fn';
import { AddSchema, isAddSchemaValid } from '../schemas/AddSchema';
import { AddResponse } from '../types/AddResponse';
import { executor } from '../executor';

export const add: Fn<typeof AddSchema, AddResponse> = async (input) => {
  return executor(() => {
    if (!isAddSchemaValid(input)) {
      throw new Error('Input does not match the defined API schema.');
    }

    const response = {
      id: 'Boom, lambda.',
    };

    return response;
  });
};
