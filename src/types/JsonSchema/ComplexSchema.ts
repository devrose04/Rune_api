import { JsonSchema, JsonSchemaToType } from './JsonSchema';
import { ArraySchema } from './ArraySchema';
import { ObjectSchema } from './ObjectSchema';

export type ComplexSchema = ArraySchema | ObjectSchema;
export type ComplexSchemaTypes = ComplexSchema['type'];
export type ComplexSchemaToType<T extends ComplexSchema> = T extends ArraySchema
  ? JsonSchemaToType<T>[]
  : T extends ObjectSchema & { required?: infer R; additionalProperties?: infer A }
  ? {
      [K in keyof T['properties']]?: JsonSchemaToType<T['properties'][K]>;
    } &
      (R extends readonly string[]
        ? { [K in R[number]]-?: JsonSchemaToType<T['properties'][K]> }
        : {}) &
      (A extends JsonSchema
        ? { [key: string]: JsonSchemaToType<A> }
        : A extends true
        ? { [key: string]: any }
        : {})
  : any;
