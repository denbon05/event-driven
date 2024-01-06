import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import envConfig from '../config/env.config';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      load: [envConfig],
    }),
    AuthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
