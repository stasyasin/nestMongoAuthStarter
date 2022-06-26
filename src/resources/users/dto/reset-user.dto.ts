import { IsEmail, IsNotEmpty } from 'class-validator';
import { MongoDbEntity } from '../../../shared/entities/mongo-db.entity';

export class ResetUserDto extends MongoDbEntity {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
