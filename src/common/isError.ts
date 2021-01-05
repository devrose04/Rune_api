export const isError = (val: unknown): val is Error => {
  return typeof val === 'object' && (val as any)?.message;
};
