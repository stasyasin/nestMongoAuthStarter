import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    const isPasswordMatch = await bcrypt.compare(plainPassword, user.password); // compare hash password from DB with user.password
    if (isPasswordMatch) {
      const { password, ...result } = user['_doc'];
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    // todo manage refreshtoken
    const payload = { username: user.email, sub: user._id.toString(), role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
