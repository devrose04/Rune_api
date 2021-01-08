import { Aett } from '../types/Aett';
import { Order } from '../types/Order';

export const FindSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    where: {
      type: 'object',
      additionalProperties: false,
      properties: {
        aett: {
          type: 'string',
          enum: [Aett.Freya, Aett.Heimdall, Aett.Tyr],
        },
        name: {
          type: 'string',
        },
      },
    },
    orderBy: {
      type: 'object',
      additionalProperties: false,
      properties: {
        aett: {
          type: 'string',
          enum: [Order.Ascending, Order.Descending],
        },
        name: {
          type: 'string',
          enum: [Order.Ascending, Order.Descending],
        },
      },
    },
  },
  additionalProperties: false,
  required: [],
} as const;