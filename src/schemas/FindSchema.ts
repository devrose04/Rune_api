import { Aett } from '../types/Aett';
import { Order } from '../types/Order';

export const FindSchema = {
  type: 'object',
  properties: {
    aett: {
      type: 'array',
      items: {
        type: 'string',
        enum: [Aett.Freya, Aett.Heimdall, Aett.Tyr],
      },
    },
    name: {
      type: 'string',
    },
    orderBy: {
      type: 'object',
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
