import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../../../shared/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
