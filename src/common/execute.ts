import Ajv, { JSONSchemaType, Schema } from 'ajv';
import { formatResponse } from './formatResponse';
import { processError } from './processError';

export const execute = async <T = any>(
  [schema, input]: [Schema | JSONSchemaType<T>, unknown],
  fn: () => Promise<T>
) => {
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
    return processError(e);
  }
};
