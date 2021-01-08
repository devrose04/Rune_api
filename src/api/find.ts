import { Fn } from '../types/Fn';
import { FindSchema } from '../schemas/FindSchema';
import { FindResponse } from '../types/FindResponse';
import { execute } from '../common/execute';
import { Rune } from '../db/entity/Rune';
import { ormConnect } from '../common/ormConnect';

export const find: Fn = async ({ queryStringParameters: params }, ctx) => {
  return execute<FindResponse>([FindSchema, params, ctx], async (input) => {
    console.log('input', input);

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
