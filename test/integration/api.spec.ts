import { callApi, RequestType } from './util/callApi';
import { AddResponse } from '../../src/types/AddResponse';
import { FindResponse } from '../../src/types/FindResponse';
import { Rune } from '../../src/db/entity/Rune';

describe('CRUD', () => {
  let addedRunes: Rune[] = [];

  afterEach(async () => {
    await Promise.all(
      addedRunes.map((r) =>
        callApi({
          endpoint: 'remove',
          type: RequestType.Delete,
          body: {
            name: r.name,
          },
        })
      )
    );

    addedRunes = [];
  });

  describe('add', () => {
    it('should throw a validation error if an invalid name is provided', async () => {
      await expect(
        callApi<AddResponse>({
          endpoint: 'add',
          type: RequestType.Post,
          body: {
            name: 5,
          },
        })
      ).rejects.toEqual(
        expect.objectContaining({
          message: 'Input does not meet schema requirements.',
        })
      );
    });

    it('should add a rune', async () => {
      const rune = await callApi<AddResponse>({
        endpoint: 'add',
        type: RequestType.Post,
        body: {
          name: 'foo2',
          transliteration: '$',
          aett: 'freya',
        },
      });

      addedRunes.push(rune);

      expect(rune).toEqual({
        name: 'foo2',
        transliteration: '$',
        aett: 'freya',
      });
    });
  });

  describe('find', () => {
    it('should throw a validation error if an aett is not supported', async () => {
      try {
        await callApi<FindResponse>({
          endpoint: 'find',
          type: RequestType.Get,
          params: {
            aett: 'foo',
          },
        });
        fail('blah');
      } catch (e) {
        expect(e.message).toBe('Input does not meet schema requirements.');
      }
    });

    it('should return all runes if no filter parameters are provided', async () => {
      const { count, runes } = await callApi<FindResponse>({
        endpoint: 'find',
        type: RequestType.Get,
        params: undefined,
      });

      expect(count).toBe(24);
      expect(runes).toHaveLength(24);
    });

    it('should filter by a single aett', async () => {
      const { count, runes } = await callApi<FindResponse>({
        endpoint: 'find',
        type: RequestType.Get,
        params: {
          aett: 'freya',
        },
      });

      expect(count).toBe(8);
      expect(runes).toHaveLength(8);
      expect(runes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'freya',
            aett: 'freya',
          }),
        ])
      );
    });

    it('should filter by multiple aettir', async () => {
      const { count, runes } = await callApi<FindResponse>({
        endpoint: 'find',
        type: RequestType.Get,
        params: {
          aett: 'freya,tyr',
        },
      });

      expect(count).toBe(16);
      expect(runes).toHaveLength(16);
      expect.arrayContaining([
        // aett of freya
        expect.objectContaining({
          name: 'freya',
          transliteration: 'f',
          aett: 'freya',
        }),
        // aett of tyr
        expect.objectContaining({
          name: 'tiwaz',
          transliteration: 't',
          aett: 'tyr',
        }),
      ]);
    });
  });

  /**
   * Remove is sort of implicitly tested in the after each hook
   * above but let's write a more explicit test here
   */
  describe('remove', () => {
    it('should remove an added rune', async () => {
      const rune = await callApi<AddResponse>({
        endpoint: 'add',
        type: RequestType.Post,
        body: { name: 'foo3', aett: 'freya' },
      });

      await expect(
        callApi({
          endpoint: 'remove',
          type: RequestType.Delete,
          body: {
            name: rune.name,
          },
        })
      ).resolves.toEqual({
        affected: 1,
      });
    });
  });

  describe('update', () => {
    it('should update an added rune', async () => {
      const rune = await callApi<AddResponse>({
        endpoint: 'add',
        type: RequestType.Post,
        body: { name: 'foo4', aett: 'freya' },
      });

      addedRunes.push(rune);

      await expect(
        callApi({
          endpoint: 'update',
          type: RequestType.Put,
          body: {
            name: rune.name,
            transliteration: 'zh',
          },
        })
      ).resolves.toEqual({
        aett: 'freya',
        name: 'foo4',
        transliteration: 'zh',
      });
    });

    it('should not overwrite transliterations', async () => {
      const rune = await callApi<AddResponse>({
        endpoint: 'add',
        type: RequestType.Post,
        body: { name: 'foo5', aett: 'freya' },
      });

      addedRunes.push(rune);

      await expect(
        callApi({
          endpoint: 'update',
          type: RequestType.Put,
          body: {
            name: rune.name,
            transliteration: 'zh',
          },
        })
      ).resolves.toEqual({
        aett: 'freya',
        name: rune.name,
        transliteration: 'zh',
      });

      await expect(
        callApi({
          endpoint: 'update',
          type: RequestType.Put,
          body: {
            name: rune.name,
            aett: 'heimdall',
          },
        })
      ).resolves.toEqual({
        aett: 'heimdall',
        name: rune.name,
        transliteration: 'zh',
      });
    });
  });
});
