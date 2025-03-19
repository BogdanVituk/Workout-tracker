import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: PrismaClient,
            useFactory: (configService: ConfigService ) => {

                const prisma = new PrismaClient({
                    datasources: {
                        db: {
                            url: configService.get<string>('DATABASE_URL')
                        }
                    }
                })
                return prisma
            },
            inject: [ConfigService]
        },
    ],
    exports: [PrismaClient]
})
export class PrismaModule {}
