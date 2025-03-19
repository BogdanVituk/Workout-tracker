import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutsModule } from './workouts/workouts.module';
import { ProgressModule } from './progress/progress.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ExercisesController } from './exercises/exercises.controller';
import { ProgressController } from './progress/progress.controller';
import { WorkoutsController } from './workouts/workouts.controller';
import { ExercisesService } from './exercises/exercises.service';
import { ProgressService } from './progress/progress.service';
import { WorkoutsService } from './workouts/workouts.service';
import { PrismaService } from './prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`, '.env']
    }),
    CacheModule.register(), 
    AuthModule, PrismaModule
  ],
  controllers: [AppController, ExercisesController, ProgressController, WorkoutsController],
  providers: [AppService, ExercisesService, ProgressService, WorkoutsService, PrismaService],
})
export class AppModule {}
