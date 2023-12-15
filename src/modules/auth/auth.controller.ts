import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { RegisterService } from './register.service';
import { LoginService } from './login.service';
import { LogUserInDto } from './dto/log-user-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService
  ) { }

  @Post('register-user')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.registerService.registerUser(createUserDto);
  }

  @Post('login-user')
  logUserIn(@Body() logUserInDto: LogUserInDto) {
    return this.loginService.logUserIn(logUserInDto);
  }

}
