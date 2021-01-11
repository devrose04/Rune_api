import { Fn } from '../types/Fn';
import { FindSchema } from '../schemas/FindSchema';
import { FindResponse } from '../types/FindResponse';
import { execute } from '../common/execute';
import { Rune } from '../db/entity/Rune';
import { ormConnect } from '../common/ormConnect';
import { Order } from '../types/Order';

export const find: Fn = ({ queryStringParameters: qp }, ctx) => {
  const params: { aett: string[]; name?: string } = {
    aett: (qp?.aett ?? '').split(',').filter((i) => i),
    name: qp?.name,
  };

  return execute<FindResponse, typeof FindSchema>(
    [FindSchema, params, ctx],
    async ({ name, aett, orderBy }) => {
      const [runes, count] = await ormConnect(
        [Rune],
        ctx.awsRequestId,
        async ([runeRepository]) => {
          return runeRepository.findAndCount({
            // Remove any undefined values from the where
            where: aett.map((a) =>
              JSON.parse(JSON.stringify({ name, aett: a }))
            ),
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
