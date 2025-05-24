import { describe, it, beforeEach } from '@jest/globals';
import { AppContext } from './common/app';
import { UserClient } from './common/client';
import { afterEach } from 'node:test';

describe('Auth', () => {
  let context: AppContext;

  beforeEach(async () => {
    context = await new AppContext().build();
  });

  afterEach(async () => {
    await context.close();
  });

  it('user', async () => {
    const client = new UserClient(context);
    // const payload = {
    //   callbackURL: '/',
    //   email: 'test@apphub.work'
    // }
    // await client.post('/api/auth/sign-in/magic-link', {}, payload).expect(200);
    // const apps = await client.get('/apps').expect(200);
    // console.log(apps.body);

    await client.get('/apps/1').expect(200);
    // console.log(app.body);
    await client.get('/apps/2').expect(404);
  });
});
