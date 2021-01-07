import { callApi, RequestType } from './util/callApi';
import { AddResponse } from '../../src/types/AddResponse';
import { FindResponse } from '../../src/types/FindResponse';

describe('CRUD', () => {
  describe('add', () => {
    it('should throw a validation error if an invalid name is provided', async () => {
      const { statusCode, errors } = await callApi<AddResponse>({
        endpoint: 'add',
        type: RequestType.Post,
        body: {
          name: 5,
        },
      });

      expect(statusCode).toBe(422);
      expect(errors).toEqual([
        {
          keyword: 'type',
          dataPath: '/name',
          schemaPath: '#/properties/name/type',
          params: {
            type: 'string',
          },
          message: 'should be string',
        },
      ]);
    });

    it('should add a rune', async () => {
      const resp = await callApi<AddResponse>({
        endpoint: 'add',
        type: RequestType.Post,
      });

      expect(resp.statusCode).toBe(200);
      expect(resp.body).toBeDefined();

      console.log('----------------------------');
      console.log(resp.body);
      console.log('----------------------------');
    });
  });

  describe.only('find', () => {
    it('should throw a validation error if no parameters are provided', async () => {
      const { statusCode, errors } = await callApi<FindResponse>({
        endpoint: 'find',
        type: RequestType.Get,
        params: undefined,
      });

      expect(statusCode).toBe(422);
      expect(errors).toEqual([
        {
          keyword: 'type',
          dataPath: '/name',
          schemaPath: '#/properties/name/type',
          params: {
            type: 'object',
          },
          message: 'should be object',
        },
      ]);
    });
  });
});
