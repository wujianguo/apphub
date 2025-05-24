import { describe, it, beforeEach } from '@jest/globals';
import { AppContext } from './common/app';
import { UserClient } from './common/client';
import { afterEach } from 'node:test';

describe('Profile', () => {
  let context: AppContext;

  beforeEach(async () => {
    context = await new AppContext().build();
  });

  afterEach(async () => {
    await context.close();
  });

  it('get', async () => {
    const client = new UserClient(context);
    await client.get('/system/health').expect(200);
  });
});
