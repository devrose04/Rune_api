import { Fn } from '../types/Fn';
import { AddSchema, isAddSchemaValid } from '../schemas/AddSchema';
import { AddResponse } from '../types/AddResponse';
import { formatResponse } from '../formatResponse';
import { processError } from '../processError';

export const add: Fn<typeof AddSchema, AddResponse> = async (input) => {
  try {
    if (!isAddSchemaValid(input)) {
      throw new Error('Input does not match the defined API schema.');
    }

    const response = {
      id: 'Boom, lambda.',
    };

    return formatResponse(response);
  } catch (e: unknown) {
    return processError(e);
  }
};
