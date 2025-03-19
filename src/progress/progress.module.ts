import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { PrismaService } from 'src/prisma.service';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
     CacheModule.register({
          store: redisStore,
          host: 'localhost',
          port: 6379,
          ttl: 60*5,
        }),
        AuthModule
  ],
  controllers: [ProgressController],
  providers: [ProgressService, PrismaService],
})
export class ProgressModule {}
