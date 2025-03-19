import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    async login(loginUserDto: LoginUserDto): Promise<{accessToken: string}> {

        const { email, password } = loginUserDto;

        const user =  await this.prisma.user.findFirst({where: {email}})

        if(user && bcrypt.compare(user.password, password)) {
            const payload = {email};
            const accessToken = await this.jwt.sign(payload)

            return { accessToken }
        } else {
            throw new Error('Пароль чи емейл не вірний')
        }

    }

    async register(createUserDto: CreateUserDto): Promise<void> {
        const { username, password, email } = createUserDto;

        const applicant =  await this.prisma.user.findFirst({where: {email}})

        if(applicant) throw new Error('Користувач з таким email існує')
        
        const hashPassword = await bcrypt.hash(password, 10)

        await this.prisma.user.create({
            data: {
                username,
                password: hashPassword,
                email
            }
        })

    }
 }
