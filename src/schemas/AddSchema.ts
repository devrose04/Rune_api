import { Aett } from '../types/Aett';

export const AddSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    aett: { type: 'string', enum: [Aett.Freya, Aett.Heimdall, Aett.Tyr] },
    transliteration: { type: 'string' },
  },
  required: ['name', 'aett'],
} as const;
