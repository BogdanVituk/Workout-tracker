import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('exercises')
@UseGuards(AuthGuard())
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(
    @Query('name') name?: string,
    @Query('category') category?: string,
    @Query('muscleGroup') muscleGroup?: string
  ) {
    return this.exercisesService.getAllExercisesByNameAndFilters({name, category, muscleGroup});
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.udateExercises(+id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.deleteExercises(+id);
  }
}
