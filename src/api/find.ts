import { Fn } from '../types/Fn';
import { FindSchema } from '../schemas/FindSchema';
import { FindResponse } from '../types/FindResponse';
import { execute } from '../common/execute';
import { Rune } from '../db/entity/Rune';
import { ormConnect } from '../common/ormConnect';
import { Order } from '../types/Order';

export const find: Fn = async ({ queryStringParameters: params }, ctx) => {
  return execute<FindResponse, typeof FindSchema>(
    [FindSchema, params ?? {}, ctx],
    async ({ name, aett, orderBy }) => {
      const [runes, count] = await ormConnect(
        [Rune],
        ctx.awsRequestId,
        async ([runeRepository]) => {
          return runeRepository.findAndCount({
            // Remove any undefined values from the where
            where: JSON.parse(JSON.stringify({ name, aett })),
            order: {
              aett: orderBy?.aett as Order,
              name: orderBy?.name as Order,
            },
          });
        }
      );

      return {
        count,
        runes,
      };
    }
  );
};
