import { Fn } from '../types/Fn';
import { FindSchema } from '../schemas/FindSchema';
import { FindResponse } from '../types/FindResponse';
import { execute } from '../common/execute';
import { getRepository, getConnectionManager } from 'typeorm';
import { Rune } from '../db/entity/Rune';

export const find: Fn<typeof FindSchema> = async (input, ctx) => {
  return execute<FindResponse>([FindSchema, input, ctx], async () => {
    const connection = await getConnectionManager()
      .create({
        type: 'postgres',
        url: process.env.TYPEORM_URL,
        name: ctx.awsRequestId,
        entities: [Rune],
      })
      .connect();
    const runeRepository = getRepository(Rune, ctx.awsRequestId);

    const [runes, count] = await runeRepository.findAndCount();

    await connection.close();

    return {
      count,
      runes,
    };
  });
};
