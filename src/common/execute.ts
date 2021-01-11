import Ajv, { Schema } from 'ajv';
import { Context } from 'aws-lambda';
import { isError } from 'lodash';
import { IApiContract } from '../types/IApiContract';
import { JsonSchema, JsonSchemaToType } from '../types/JsonSchema';
import { formatErrResponse } from './formatErrorResponse';
import { formatResponse } from './formatResponse';

export async function execute<R, T extends JsonSchema>(
  [schema, event, ctx]: [Schema | JsonSchemaToType<T>, unknown, Context],
  fn: (input: JsonSchemaToType<T>) => Promise<R>
): Promise<IApiContract> {
  const validator = new Ajv().compile<JsonSchemaToType<T>>(schema);

  try {
    if (!validator(event)) {
      return formatResponse({
        name: 'ValidationError',
        message: 'Input does not meet schema requirements.',
        requestId: ctx.awsRequestId,
        code: 422,
        data: {
          errors: validator.errors,
          input: event,
          schema,
        },
      });
    }

    return formatResponse(await fn(event));
  } catch (e: unknown) {
    if (isError(e)) {
      return formatResponse(
        formatErrResponse({ ...e, requestId: ctx.awsRequestId })
      );
    }

    return formatResponse(
      formatErrResponse({
        name: 'InternalServerError',
        message: 'Could not process error',
        code: 500,
        requestId: ctx.awsRequestId,
      })
    );
  }
}
