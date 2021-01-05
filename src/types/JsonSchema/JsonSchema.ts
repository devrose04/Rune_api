import { ComplexSchema } from './ComplexSchema';
import { OperatorSchema, OperatorSchemaToType } from './OperatorSchema';
import { PrimitiveSchema } from './PrimitiveSchema';
import { ValueSchema, ValueSchemaToType } from './ValueSchema';

export type JsonSchema = PrimitiveSchema | ComplexSchema | OperatorSchema;
export type JsonSchemaToType<T extends JsonSchema> = T extends ValueSchema
  ? ValueSchemaToType<T>
  : T extends OperatorSchema
  ? OperatorSchemaToType<T>
  : any;
