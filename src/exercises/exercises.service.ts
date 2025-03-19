import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExercisesService {

  constructor(private prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto) {

    const { category, muscleGroup, description, name } = createExerciseDto

    return await this.prisma.exercises.create({
      data: {
        category: category,
        muscle_group: muscleGroup,
        name: name,
        description: description 
      }
    }) 
  }

  async getAllExercisesByNameAndFilters(filters: {name?: string; category?: string; muscleGroup?: string }) {
    return await this.prisma.exercises.findMany({
      where: {
        name: filters.name ? {contains: filters.name}: undefined,
        category: filters.category,
        muscle_group: filters.muscleGroup

      }
    });

  }
  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  async udateExercises(id: number, updateExerciseDto: UpdateExerciseDto) {
    return await this.prisma.exercises.update({
      where: {id},
      data: updateExerciseDto
    })
  }

  async deleteExercises(id: number) {
    return await this.prisma.exercises.delete({
      where: {id}
    })
  }
}
