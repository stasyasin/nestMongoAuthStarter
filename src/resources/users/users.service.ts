import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
  }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const plainPassword = registerUserDto.password; // store plain password
    const saltRounds = 10; // salt rounds
    const salt = await bcrypt.genSalt(saltRounds); // generate salt
    const hashPassword = await bcrypt.hash(plainPassword, salt); // generate hashPassword
    registerUserDto.password = hashPassword; // replace plainPassword with hashPassword
    registerUserDto.email = registerUserDto.email.toLowerCase(); // force email to lowercase
    const createdUser = new this.userModel(registerUserDto);
    return createdUser.save();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email?.toLowerCase() }).exec();
  }

}
