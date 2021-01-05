import { AllOfSchema } from './AllOfSchema';
import { AnyOfSchema } from './AnyOfSchema';
import { NotSchema } from './NotSchema';
import { OneOfSchema } from './OneOfSchema';
import { UnionToIntersection } from './UnionToIntersection';
import { ValueSchemaToType } from './ValueSchema';

export type OperatorSchema = AnyOfSchema | AllOfSchema | OneOfSchema | NotSchema;
export type OperatorSchemaToType<T extends OperatorSchema> = T extends AnyOfSchema
  ? ValueSchemaToType<T['anyOf'][number]>
  : T extends AllOfSchema
  ? UnionToIntersection<ValueSchemaToType<T['allOf'][number]>>
  : T extends OneOfSchema
  ? ValueSchemaToType<T['oneOf'][number]>
  : any;
