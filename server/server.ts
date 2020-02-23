import Koa from 'koa';
import session from 'koa-session';
import mongoose from 'mongoose';

import config from './config';
import router from './router';
import apollo from './apollo';
import User from './models/User';

mongoose.connect(config.mongodb.uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error);


const app = new Koa();
app.keys = config.keys;
app.use(session({
  maxAge: 365 * 24 * 3600 * 1000,
  httpOnly: true,
}, app));

app.use(async (ctx, next) => {
  if (ctx.session.user_id) {
    ctx.user = await User.findById(ctx.session.user_id);
  }
  return next();
});

apollo.applyMiddleware({ app });

app
  .use(router.routes())
  .use(router.allowedMethods())
;

// The `listen` method launches a web server.
app.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at ${apollo.graphqlPath}`);
});
