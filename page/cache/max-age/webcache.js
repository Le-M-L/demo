
import path from 'path';
import Koa from 'koa';
//  https://www.cnblogs.com/tugenhua0707/p/10807289.html
//静态资源中间件
import resource from 'koa-static';
const app = new Koa();
const host = 'localhost';
const port = 7878;

app.use(async (ctx, next) => {
 // 设置响应头Cache-Control 设置资源有效期为300秒
  ctx.set({
    'Cache-Control': 'max-age=30'  
  });
  await next();
});

app.use(resource(path.join(__dirname, './static')));

app.listen(port, () => {
  console.log(`server is listen in ${host}:${port}`);
});