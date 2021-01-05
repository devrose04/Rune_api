import { JsonSchema } from './JsonSchema';

export type ObjectSchema = {
  type: 'object';
  required?: readonly string[];
  additionalProperties?: JsonSchema | boolean;
  properties: {
    [key: string]: JsonSchema;
  };
};
