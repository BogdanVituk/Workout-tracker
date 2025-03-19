import { IsNotEmpty, IsString } from "class-validator"

export class CreateWorkoutsDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    @IsNotEmpty()
    userId: string
}