import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<{accessToken: string}> {
    return this.authService.login(loginUserDto)
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.register(createUserDto)
  }
}
