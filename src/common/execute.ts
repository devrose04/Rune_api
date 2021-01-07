import Ajv, { JSONSchemaType, Schema } from 'ajv';
import { Context } from 'aws-lambda';
import isError from 'lodash.iserror';
import { IApiContract } from '../types/IApiContract';
import { formatErrResponse } from './formatErrorResponse';
import { formatResponse } from './formatResponse';

export async function execute<T = unknown>(
  [schema, input, ctx]: [Schema | JSONSchemaType<T>, unknown, Context],
  fn: () => Promise<T>
): Promise<IApiContract> {
  const ajv = new Ajv();
  const validator = ajv.compile<typeof schema>(schema);
  const isValid = validator(input);

  try {
    if (!isValid) {
      return formatResponse({
        name: 'ValidationError',
        message: 'Input does not meet schema requirements.',
        requestId: ctx.awsRequestId,
        code: 422,
        data: {
          errors: validator.errors,
        },
      });
    }

    return formatResponse(await fn());
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
