import { Controller, Get,Param, Headers, HttpCode, Post, Redirect, Req } from '@nestjs/common';
import { Request } from "express"

export class CreateCatDto {
    readonly name: string;
    readonly age: number;
    readonly breed: string;
  }

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request:Request): string {
    return '这是一个控制器';
  }

  @Post()
  @HttpCode(204)
//   @Headers('Cache-Control','none')
  @Redirect('https://nestjs.com', 301)
  create():string {
      return '这是一个post请求'
  }

  @Get(':id')
    findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
    }
}
