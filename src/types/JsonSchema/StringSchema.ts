import { ValueSchema } from './ValueSchema';

export type StringSchema = {
  type: 'string' | 'email' | 'date-time' | 'date' | 'time' | 'uri';
  enum?: readonly string[];
};
export type StringSchemaToType<T extends ValueSchema> = T extends StringSchema & { enum: infer E }
  ? E extends string[]
    ? E[number]
    : string
  : string;
