import Ajv, { JSONSchemaType, Schema } from 'ajv';
import { Context } from 'aws-lambda';
import isError from 'lodash.iserror';
import { IApiContract } from '../types/IApiContract';
import { formatErrResponse } from './formatErrorResponse';
import { formatResponse } from './formatResponse';

export async function execute<T = unknown>(
  [schema, event, ctx]: [Schema | JSONSchemaType<T>, unknown, Context],
  fn: (input: JSONSchemaType<T>) => Promise<T>
): Promise<IApiContract> {
  const ajv = new Ajv();
  const validator = ajv.compile<typeof schema>(schema);

  try {
    if (!validator(event)) {
      return formatResponse({
        name: 'ValidationError',
        message: 'Input does not meet schema requirements.',
        requestId: ctx.awsRequestId,
        code: 422,
        data: {
          errors: validator.errors,
        },
      });
    } else {
      // forgive me, future me
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return formatResponse(await fn(event as any));
    }
  } catch (e: unknown) {
    if (isError(e)) {
      return formatResponse(
        formatErrResponse({
          ...e,
          requestId: ctx.awsRequestId,
        })
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
