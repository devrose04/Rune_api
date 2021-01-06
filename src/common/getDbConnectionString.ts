export const getDbConnectionString = (): string => {
  if (!process.env.TYPEORM_URL) {
    throw new Error('No "TYPEORM_URL" defined in the environment vars.');
  }

  return process.env.TYPEORM_URL;
};
