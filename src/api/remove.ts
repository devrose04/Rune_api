import { Fn } from '../types/Fn';
import { RemoveSchema } from '../schemas/RemoveSchema';
import { execute } from '../common/execute';
import { ormConnect } from '../common/ormConnect';
import { Rune } from '../db/entity/Rune';

export const remove: Fn = async ({ body }, ctx) => {
  return execute<{ affected: number }, typeof RemoveSchema>(
    [RemoveSchema, JSON.parse(body), ctx],
    async ({ name }) => {
      const { affected } = await ormConnect(
        [Rune],
        ctx.awsRequestId,
        async ([runeRepository]) => {
          return runeRepository.delete({ name });
        }
      );

      return {
        affected: affected ?? 0,
      };
    }
  );
};
