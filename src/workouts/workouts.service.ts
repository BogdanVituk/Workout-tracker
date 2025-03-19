import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkoutsDto } from './dto/createWorkouts.dto';
import { UpdateWorkoutsDto } from './dto/updateWorkouts.dto';
import { Workouts } from '@prisma/client';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class WorkoutsService {
    
    constructor(
        private readonly prisma: PrismaService
    ) {

    }

    async getAllWorkouts(): Promise<Workouts[]> {
        return await this.prisma.workouts.findMany({
            include: {exercises: true, progress: true}
        })
    }

    async createWorkouts(createWorkoutsDto: CreateWorkoutsDto): Promise<Workouts> {

        const { name, userId } = createWorkoutsDto
        
        return await this.prisma.workouts.create({
            data: {
                name: name,
                userId: +userId
            }
        })
    }

    async updateWorkouts(id: number, updateWorkoutsDto: UpdateWorkoutsDto): Promise<Workouts> {

        const { name } = updateWorkoutsDto
        
       return await this.prisma.workouts.update({
        where: {id },
        data: {
            name: name
        }
       }) 
    }

    async deleteWorkouts(id: number) {
        return await this.prisma.workouts.delete({
            where: {id}
        })
    }
}
