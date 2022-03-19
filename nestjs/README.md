# 创建nest 
nest new 文件名
yarn install      ---- 安装依赖
yarn start:dev    ---- 启动服务并且动态监听

# 解决跨域
app.enableCors()    ----在main.ts 中添加 可解决跨域问题

# 创建路由
nest g controller cats  ---- 创建路由控制器 创建cat文件

@Controller('cats)  --- cats 为路由添加前缀

@Get('detail')    --- get请求 --- 会自动生成为 cats/detail
@Post()         ----post 请求


import { Request } from "express"
// Request 代表http请求 
@Post()
findAll(@Req() request:Request){}  ---- 接受参数为 http


接收参数对象列表
@Request()，@Req()	        req
@Response()，@Res()*	      res
@Next()	                    next
@Session()	                req.session
@Param(key?: string)	      req.params/req.params[key]
@Body(key?: string)	        req.body/req.body[key]
@Query(key?: string)	      req.query/req.query[key]
@Headers(name?: string)	    req.headers/req.headers[name]
@Ip()	                      req.ip
@HostParam()	              req.hosts

路由通配符

@Get(ab*cd); // ab_cd abcd  将匹配

@HttpCode(204)  // 状态码

 @Headers('Cache-Control','none') // 响应头

 @Redirect('https://nestjs.com', 301) //路由重定向

 @Get(':id')  // 路由参数


 请求负载

 export class CreateCatDto {
    readonly name: string;
    readonly age: number;
    readonly breed: string;
  }