import { callApi, RequestType } from './util/callApi';
import { AddResponse } from '../../src/types/AddResponse';
import { FindResponse } from '../../src/types/FindResponse';

describe('CRUD', () => {
  describe('add', () => {
    it('should throw a validation error if an invalid name is provided', async () => {
      // const { statusCode, errors } = await callApi<AddResponse>({
      //   endpoint: 'add',
      //   type: RequestType.Post,
      //   body: {
      //     name: 5,
      //   },
      // });
      // expect(statusCode).toBe(422);
      // expect(errors).toEqual([
      //   {
      //     keyword: 'type',
      //     dataPath: '/name',
      //     schemaPath: '#/properties/name/type',
      //     params: {
      //       type: 'string',
      //     },
      //     message: 'should be string',
      //   },
      // ]);
    });

    it('should add a rune', async () => {
      // const resp = await callApi<AddResponse>({
      //   endpoint: 'add',
      //   type: RequestType.Post,
      // });
    });
  });

  describe.only('find', () => {
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
});
