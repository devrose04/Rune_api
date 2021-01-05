import { Aett } from '../types/Aett';

export const FindSchema = {
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
} as const;
