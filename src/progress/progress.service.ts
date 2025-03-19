import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProgressDto } from './dto/create.progress.dto';
import {  Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager'; 
import { Cache } from 'cache-manager';

@Injectable()
export class ProgressService {
    constructor(
        private  prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async createProgress(createProgressDto: CreateProgressDto) {

        const { userId, workoutId, weight, date } = createProgressDto;

        return await this.prisma.progress.create({
            data: {
                userId: +userId,
                workoutId: +workoutId,
                weight: weight,
                date: new Date(date)
            }
        })
    }

    async getProgressByWorkout(workoutId: number) {
        return await this.prisma.progress.findMany({
            where: { workoutId },
            orderBy: { date: 'asc' }
        })
    }

    async getProgressByRangeDate(workoutId: number, startDate: string, endDate: string) {
        return await this.prisma.progress.findMany({
            where: {
                workoutId,
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                }
            },
            orderBy: { date: 'asc' },
        })
    }

    async getProgressFoChart(workoutId: number, startDate?: string, endDate?: string) {
        const cacheKey = `progress:${workoutId}:${startDate || 'all'}: ${endDate || 'all'}`;

        const cacheData = await this.cacheManager.get(cacheKey);

        if(cacheData) {
            console.log('Отримали з кеша', cacheKey);
            return cacheData
        }

        let progressDate = []
        if(startDate && endDate) {
            progressDate = await this.getProgressByRangeDate(workoutId, startDate, endDate)
        } else {
            progressDate = await this.getProgressByWorkout(workoutId);
        }

        const formateedData = progressDate.map(progres => ({
            date: progres.date.toISOString().split('T')[0],
            weight: progres.weight
        }))

        await this.cacheManager.set(cacheKey, formateedData, 60*5)

        console.log('Збережне в кеш', cacheKey);
        return formateedData;
    }
}
