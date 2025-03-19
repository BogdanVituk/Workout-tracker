import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateExerciseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    description: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    muscleGroup: string;
}
