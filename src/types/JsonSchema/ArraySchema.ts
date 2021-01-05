import { JsonSchema } from './JsonSchema';

export type ArraySchema = {
  type: 'array';
  items: JsonSchema;
};
