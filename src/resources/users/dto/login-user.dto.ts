import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { MongoDbEntity } from '../../../shared/entities/mongo-db.entity';

export class LoginUserDto extends MongoDbEntity {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
