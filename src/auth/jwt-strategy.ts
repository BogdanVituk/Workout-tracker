import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PrismaService } from "src/prisma.service";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {   
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()   
        })
    }

    async validate(payload: {email: string}) {
        const { email } = payload
        const user = await this.prisma.user.findUnique({where: {email}})  
        
        if(!user) {
            throw new UnauthorizedException('login first to access this endpoint.')
        } 

        return user;
    }
}