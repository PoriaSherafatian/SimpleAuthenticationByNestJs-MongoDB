import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupData : SignupDto){
    return this.authService.signup(signupData)
  }

  @Post('login')
  async login(@Body() credentials : LoginDto){
    return this.authService.login(credentials)
  }

}