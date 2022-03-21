import { Injectable } from '@nestjs/common';

let count = 0;
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!123123';
  }
  getData(){
    return count++
  }
}
