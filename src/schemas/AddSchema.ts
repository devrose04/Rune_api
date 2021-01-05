import Ajv from 'ajv';

export const AddSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
} as const;

const ajv = new Ajv();

export const isAddSchemaValid = (input: unknown): input is typeof AddSchema => {
  const validator = ajv.compile<typeof AddSchema>(AddSchema);
  return validator(input);
};
