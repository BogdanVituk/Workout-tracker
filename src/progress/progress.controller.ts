import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create.progress.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  createProgress(@Body() dto: CreateProgressDto) {
    return this.progressService.createProgress(dto)
  }

  @Get()
  getProgress(
    @Query('workoutId') workoutId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string 
  ) {
    if(startDate && endDate) {
      return this.progressService.getProgressByRangeDate(+workoutId, startDate, endDate)
    } else {
      return this.progressService.getProgressByWorkout(+workoutId)
    }
  }

  @Get('chart')
  getProgressFoChart(
    @Query('workoutId') workoutId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.progressService.getProgressFoChart(+workoutId)
  }

}
