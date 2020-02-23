import Router from '@koa/router';
import session from 'koa-session';
import { authenticate } from './auth';

const router: Router<any, {session: session.Session}> = new Router();

router.get('/auth', async (ctx, next) => {
  const user = await authenticate(ctx.query);
  if (typeof user === 'string') {
    ctx.redirect(user);
  } else if (user) {
    ctx.session.user_id = user._id;
    ctx.body = user;
    await next();
  }
});

router.get('/logout', async (ctx, next) => {
  ctx.session.user_id = null;
  ctx.body = {};
  await next();
});

export default router;