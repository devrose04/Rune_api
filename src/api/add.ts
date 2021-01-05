import { Fn } from '../types/Fn';

interface IAddResponse {
  id: string;
}

export const AddSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
} as const;

export const add: Fn<typeof AddSchema, IAddResponse> = async (test) => {
  const response = {
    id: 'Boom, lambda.',
  };

  return response;
};
