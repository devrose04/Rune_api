import { invoke } from './util/invoke';

describe('CRUD', () => {
  describe('add', () => {
    it('should add a rune', async () => {
      console.log('test');
      await invoke('add');
      console.log('test2');
    });
  });
});
