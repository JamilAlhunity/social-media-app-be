import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'modules/users/users.service';
import { LogUserInDto } from './dto/log-user-in.dto';
import { ResponseFromServiceI } from 'shared/interfaces/general/response-from-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {

    constructor(
        private readonly userService: UsersService
    ) { }
    /**
    * Provided Email and Password
    *
    * If User Exist
    * Check Password using bcrypt, and I make sure that the checked password aligns with the given email
    *
    * action to show that the user logged
    */

    async logUserIn(
        logUserInDto: LogUserInDto,
    ): Promise<ResponseFromServiceI<string>> {

        const { email } = logUserInDto;

        const user = this.userService.findUserByEmail(email);

        if (!user)
            throw new HttpException(
                'User Credentials is incorrect',
                HttpStatus.UNAUTHORIZED,
            );
        const { password } = user;

        const isPasswordCorrect = await bcrypt.compare(
            logUserInDto.password,
            password
        )

        if (!isPasswordCorrect)
            throw new HttpException(
                'User Credentials is incorrect',
                HttpStatus.UNAUTHORIZED,
            );
        return {
            data: user.username,
            message: 'logged in successfully',
            httpStatus: HttpStatus.OK,
        };
    }

}
