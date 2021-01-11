import { Fn } from '../types/Fn';
import { UpdateSchema } from '../schemas/UpdateSchema';
import { execute } from '../common/execute';
import { ormConnect } from '../common/ormConnect';
import { Rune } from '../db/entity/Rune';

export const update: Fn = async ({ body }, ctx) => {
  return execute<Rune, typeof UpdateSchema>(
    [UpdateSchema, JSON.parse(body), ctx],
    async ({ name, aett, transliteration = '' }) => {
      return ormConnect([Rune], ctx.awsRequestId, async ([runeRepository]) => {
        // const rune = new Rune({ name, aett, transliteration });
        await runeRepository.update({ name }, { aett, transliteration });
        // return rune;

        return { name, aett, transliteration } as any;
      });
    }
  );
};
