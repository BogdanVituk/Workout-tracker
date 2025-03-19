import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercise.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
    
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    muscleGroup?: string;
}
