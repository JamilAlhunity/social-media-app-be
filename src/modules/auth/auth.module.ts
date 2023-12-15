import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'modules/users/users.module';
import { RegisterService } from './register.service';
import { LoginService } from './login.service';
import { PasswordService } from './password.service';
import { LogoutService } from './logout.service';

@Module({
  controllers: [AuthController],
  providers: [LoginService, RegisterService, PasswordService, LogoutService],
  imports: [UsersModule]
})
export class AuthModule { }
