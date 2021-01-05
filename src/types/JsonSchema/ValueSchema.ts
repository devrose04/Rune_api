import { ComplexSchema, ComplexSchemaToType } from './ComplexSchema';
import { PrimitiveSchema, PrimitiveSchemaToType } from './PrimitiveSchema';

export type ValueSchema = ComplexSchema | PrimitiveSchema;
export type ValueSchemaToType<T extends ValueSchema> = T extends ComplexSchema
  ? ComplexSchemaToType<T>
  : T extends PrimitiveSchema
  ? PrimitiveSchemaToType<T>
  : any;
