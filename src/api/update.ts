import { Fn } from '../types/Fn';
import { UpdateSchema } from '../schemas/UpdateSchema';
import { execute } from '../common/execute';
import { ormConnect } from '../common/ormConnect';
import { Rune } from '../db/entity/Rune';

export const update: Fn = async ({ body }, ctx) => {
  return execute<Rune, typeof UpdateSchema>(
    [UpdateSchema, JSON.parse(body), ctx],
    async ({ name, aett, transliteration }) => {
      return ormConnect([Rune], ctx.awsRequestId, async ([runeRepository]) => {
        const existing = await runeRepository.findOne({ name });
        const rune = new Rune({
          name,
          aett: aett ?? existing.aett,
          transliteration: transliteration ?? existing.transliteration,
        });
        await runeRepository.update({ name }, rune);
        return rune;
      });
    }
  );
};
