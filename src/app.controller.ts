import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './shared/decorators/roles.decorator';
import { Role } from './shared/enums/role.enum';
import { Public } from './shared/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  @Roles(Role.USER)
  findAllUsers() {
    return this.appService.getUsers();
  }

  @Get('admins')
  @Roles(Role.ADMIN)
  findAllAdmins() {
    return this.appService.getAdmins();
  }
}
