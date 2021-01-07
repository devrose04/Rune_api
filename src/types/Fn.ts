import { Handler } from 'aws-lambda';
import { JsonSchema, JsonSchemaToType } from './JsonSchema';

export type Fn<I extends Readonly<JsonSchema>, R = unknown> = Handler<
  JsonSchemaToType<I>,
  R
>;
