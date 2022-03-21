import { Controller, Get, HttpCode,Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  @Header('Cache-Control','max-age=36000 public')
  @HttpCode(200)
  getHello(): string {

  return `${this.appService.getHello()}`;
  }
}
