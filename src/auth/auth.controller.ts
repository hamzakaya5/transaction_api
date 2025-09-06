import { Body, Controller, Post, Get, Headers } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';
import { User } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.username, dto.email, dto.password);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @Post('logout')
  @Auth()
  async logout(@User() user: any) {
    return this.authService.logout(user.sub);
  }

  @Get('me')
  @Auth()
  async me(@Headers('authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    return { token };
  }
}
