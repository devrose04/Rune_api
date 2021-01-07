import { BooleanSchema } from './BooleanSchema';
import { NullSchema } from './NullSchema';
import { NumberSchema } from './NumberSchema';
import { StringSchema, StringSchemaToType } from './StringSchema';

export type PrimitiveSchema =
  | NumberSchema
  | StringSchema
  | BooleanSchema
  | NullSchema;
export type PrimitiveSchemaTypes = PrimitiveSchema['type'];
export type PrimitiveSchemaToType<T extends PrimitiveSchema> = {
  null: null;
  boolean: boolean;
  number: number;
  integer: number;
  string: StringSchemaToType<T>;
  email: StringSchemaToType<T>;
  'date-time': StringSchemaToType<T>;
  date: StringSchemaToType<T>;
  time: StringSchemaToType<T>;
  uri: StringSchemaToType<T>;
}[T['type']];
