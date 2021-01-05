import { callApi, RequestType } from './util/callApi';
import { AddResponse } from '../../src/types/AddResponse';

describe('CRUD', () => {
  describe('add', () => {
    it('should add a rune', async () => {
      const resp = await callApi<AddResponse>({ endpoint: 'add', type: RequestType.Post });

      expect(resp.statusCode).toBe(200);
      expect(resp.body).toBeDefined();

      console.log('----------------------------');
      console.log(resp.body);
      console.log('----------------------------');
    });
  });
});
