import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "modules/users/dto/create-user.dto";
import { User } from "modules/users/entities/user.entity";
import { UsersService } from "modules/users/users.service";
import { ResponseFromServiceI } from "shared/interfaces/general/response-from-service.interface";
import * as bcrypt from 'bcrypt';
@Injectable()
export class RegisterService {

    constructor(private readonly userService: UsersService) { }

    async registerUser(createUserDto: CreateUserDto): Promise<ResponseFromServiceI<User>> {
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        createUserDto.password = hashedPassword;

        const createdUser = this.userService.createUserForAuth(createUserDto);

        return {
            httpStatus: HttpStatus.CREATED,
            message: "user created successfully",
            data: createdUser,
        };
    }
}