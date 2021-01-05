import { Handler } from 'aws-lambda';
import { JsonSchema, JsonSchemaToType } from './JsonSchema';

// export type Fn<I extends Readonly<JsonSchema>, R = any> = (
//   event: JsonSchemaToType<I>
// ) => Handler<JsonSchemaToType<I>, R | Promise<R>>;

export type Fn<I extends Readonly<JsonSchema>, R = any> = Handler<JsonSchemaToType<I>, R>;
