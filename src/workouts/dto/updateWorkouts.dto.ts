import { IsNotEmpty, IsString } from "class-validator";

export class UpdateWorkoutsDto {
    @IsString()
    @IsNotEmpty()
    name: string
}