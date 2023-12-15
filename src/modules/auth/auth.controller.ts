import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { RegisterService } from './register.service';
import { LoginService } from './login.service';
import { LogUserInDto } from './dto/log-user-in.dto';
import { Public } from 'core/decorators/public.decorator';
import { AccessTokenGuard } from 'core/guards/access-token.guard';
import { RequestI } from 'shared/interfaces/http/request.interface';
import { LogoutService } from './logout.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService
  ) { }

  @Public()
  @Post('register-user')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.registerService.registerUser(createUserDto);
  }

  @Public()
  @Post('login-user')
  logUserIn(@Body() logUserInDto: LogUserInDto) {
    return this.loginService.logUserIn(logUserInDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout-user')
  logoutUser(@Req() req: RequestI) {
    this.logoutService.logoutUser(req.user.sub);
  }

}
