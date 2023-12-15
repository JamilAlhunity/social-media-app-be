import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'modules/users/users.module';
import { RegisterService } from './register.service';
import { LoginService } from './login.service';
import { PasswordService } from './password.service';

@Module({
  controllers: [AuthController],
  providers: [LoginService, RegisterService, PasswordService],
  imports: [UsersModule]
})
export class AuthModule { }
