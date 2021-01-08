import { Aett } from '../types/Aett';

export const FindSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    aett: {
      type: 'string',
      enum: [Aett.Freya, Aett.Heimdall, Aett.Tyr],
    },
    name: {
      type: 'string',
    },
  },
  additionalProperties: false,
  required: [],
} as const;
