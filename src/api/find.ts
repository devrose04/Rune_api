import { Fn } from '../types/Fn';
import { FindSchema } from '../schemas/FindSchema';
import { FindResponse } from '../types/FindResponse';
import { execute } from '../common/execute';
import { Rune } from '../db/entity/Rune';
import { ormConnect } from '../common/ormConnect';

export const find: Fn<typeof FindSchema> = async (input, ctx) => {
  return execute<FindResponse>([FindSchema, input, ctx], async () => {
    const [runes, count] = await ormConnect(
      [Rune],
      ctx.awsRequestId,
      async ([runeRepository]) => {
        return runeRepository.findAndCount();
      }
    );

    return {
      runes,
      count,
    };
  });
};
