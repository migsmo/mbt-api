import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './commons/common.module';
import config from './config/config';
import { CreateServiceModule } from './services/service.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    CommonModule,
    CreateServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
