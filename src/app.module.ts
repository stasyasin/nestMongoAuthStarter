import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { AuthModule } from './resources/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './resources/auth/guards/jwt-auth.guard';
import { RolesGuard } from './resources/auth/guards/roles.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

const modules = [
  ConfigModule.forRoot({
    envFilePath: `${process.cwd()}/src/config/envs/${process.env.NODE_ENV.trim()}.env`,
    load: [configuration],
    isGlobal: true,
  }),
  MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB}.iafza.mongodb.net/?retryWrites=true&w=majority`),
  ThrottlerModule.forRoot({
    ttl: 60,
    limit: 10,
  }),
  UsersModule,
  AuthModule,
  JwtModule
];

const guards = [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
];

@Module({
  imports: [...modules],
  controllers: [AppController],
  providers: [
    ...guards,
    AppService
  ],
})
export class AppModule {
}
