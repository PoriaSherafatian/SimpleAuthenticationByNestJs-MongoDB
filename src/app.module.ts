import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:hddTMwOTA4YsdfOWNZGE1M2NhYTMwOTA4@195.248.240.237:27018/'),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
