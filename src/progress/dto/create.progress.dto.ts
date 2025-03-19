import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Transform } from 'class-transformer';

export class CreateProgressDto {

    @IsNotEmpty()
    @IsString()
    userId: string

    @IsString()
    @IsNotEmpty()
    workoutId:   string
    
    @IsOptional()
    @IsInt()
    weight?:     number

    @IsNotEmpty()
    @Transform(({ value }) => new Date(value)) 
    @IsDate()
    date: string
}