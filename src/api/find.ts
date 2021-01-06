import { Fn } from '../types/Fn';
import { FindSchema } from '../schemas/FindSchema';
import { FindResponse } from '../types/FindResponse';
import { execute } from '../common/execute';
import { IApiContract } from '../types/IApiContract';
import { getRepository } from 'typeorm';
import { Rune } from '../db/entity/Rune';

export const find: Fn<typeof FindSchema, IApiContract<FindResponse>> = (input) => {
  return execute([FindSchema, input], async () => {
    const runeRepository = getRepository(Rune);
    const [runes, count] = await runeRepository.findAndCount();

    return {
      count,
      runes,
    };
  });
};
