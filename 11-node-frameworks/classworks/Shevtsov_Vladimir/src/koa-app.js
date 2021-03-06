const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const session = require('koa-generic-session');
const serve = require('koa-static');
const router = new Router();
const mount = require('koa-mount');
const xtpl = require('koa-xtpl');
const bodyParser = require('koa-bodyparser');
const Joi = require('joi');

app.keys = ['keys', 'asd'];
app.use(session());


const index = async (ctx, next) => {
  await ctx.render('index', { sessionCounter: ctx.state.sessionCounter });
  return next();
}

const form = async (ctx, next) => {
  await ctx.render('form');
  return next();
}

const data = async (ctx, next) => {
  await ctx.render('data', { data: ctx.session.data });
  return next();
}

router.get('/', index);
router.get('/form', form);

const schema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  descr: Joi.string().min(3).required(),
  mark: Joi.number(),
});

const validator = (ctx, next) => {
  const { error } = schema.validate(ctx.request.body);
  if (!error) return next();
  else {
    ctx.body = error;
  }
};

router.post(
  '/summer',
  validator,
  async (ctx, next) => {
    const body = ctx.request.body;
    const { name, lastName, descr, mark } = body;
    ctx.session.data = ctx.session.data || [];
    ctx.session.data.push({ name, lastName, descr, mark });

    return data(ctx, next);
  }
);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: err.message,
    };
  }
});

app.use(bodyParser());

app.use(async (ctx, next) => {
  ctx.session.counter = ctx.session.counter || 0;
  ctx.session.counter += 1;
  ctx.state.sessionCounter = `session counter: ${ctx.session.counter}`;
  return next();
});

app.use(xtpl('./templates'));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(mount('/static', serve('./static', { extensions: true })));
app.listen(3000);
