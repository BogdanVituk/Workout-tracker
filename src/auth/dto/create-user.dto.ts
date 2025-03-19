import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(32)
    username: string

    @IsEmail()
    email: string


    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password: string
}