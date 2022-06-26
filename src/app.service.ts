import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This is SPARTA!!!';
  }

  getUsers() {
    return `This action is restricted only to users`;
  }

  getAdmins() {
    return `This action is restricted only to users`;
  }
}
