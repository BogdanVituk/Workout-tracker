import { Controller, Get, Post, Body, Put, Param,Delete, UseGuards } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutsDto } from './dto/createWorkouts.dto';
import { UpdateWorkoutsDto } from './dto/updateWorkouts.dto';
import { Workouts } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard())
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  getAll(): Promise<Workouts[]> {
    return this.workoutsService.getAllWorkouts();
  }

  @Post()
  createWorkouts(@Body() dto: CreateWorkoutsDto): Promise<Workouts> {
    return this.workoutsService.createWorkouts(dto)
  }

  @Put(':id')
  update(@Param() id: number, dto: UpdateWorkoutsDto): Promise<Workouts> {
    return this.workoutsService.updateWorkouts(id, dto);
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.workoutsService.deleteWorkouts(id)
  }
}
