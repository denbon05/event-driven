import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.getOrThrow<string>('userServiceURL'),
      }),
    }),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
