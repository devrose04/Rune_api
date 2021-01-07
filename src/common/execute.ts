import Ajv, { JSONSchemaType, Schema } from 'ajv';
import { IApiContract } from '../types/IApiContract';
import { formatResponse } from './formatResponse';
import { processError } from './processError';

export const execute = async <T = unknown>(
  [schema, input]: [Schema | JSONSchemaType<T>, unknown],
  fn: () => Promise<T>
): Promise<IApiContract<T>> => {
  const ajv = new Ajv();
  const validator = ajv.compile<typeof schema>(schema);
  const isValid = validator(input);

  try {
    if (!isValid) {
      return {
        statusCode: 422,
        errors: validator.errors,
      };
    }

    return formatResponse(await fn());
  } catch (e: unknown) {
    const err = processError(e);
    console.error(err);
    return err;
  }
};
