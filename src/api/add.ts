import { Fn } from '../types/Fn';
import { AddSchema } from '../schemas/AddSchema';
import { AddResponse } from '../types/AddResponse';
import { execute } from '../common/execute';
import { ormConnect } from '../common/ormConnect';
import { Rune } from '../db/entity/Rune';

export const add: Fn = async ({ body }, ctx) => {
  return execute<AddResponse, typeof AddSchema>(
    [AddSchema, JSON.parse(body), ctx],
    async ({ name, aett, transliteration = '' }) => {
      return ormConnect([Rune], ctx.awsRequestId, async ([runeRepository]) => {
        const entity = runeRepository.create({ name, aett, transliteration });
        await runeRepository.save(entity);
        return entity;
      });
    }
  );
};
