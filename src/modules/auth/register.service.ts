import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "modules/users/dto/create-user.dto";
import { User } from "modules/users/entities/user.entity";
import { UsersService } from "modules/users/users.service";
import { ResponseFromServiceI } from "shared/interfaces/general/response-from-service.interface";
import * as bcrypt from 'bcrypt';
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "resources/generated/i18n.generated";
@Injectable()
export class RegisterService {

    constructor(
        private readonly userService: UsersService,
        private readonly i18n: I18nService<I18nTranslations>,
    ) { }

    async registerUser(createUserDto: CreateUserDto): Promise<ResponseFromServiceI<User>> {
        const { password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        createUserDto.password = hashedPassword;

        const createdUser = this.userService.createUserForAuth(createUserDto);

        return {
            httpStatus: HttpStatus.CREATED,
            message: this.i18n.t('shared.success.create', {
                args: { entity: this.i18n.t('entities.user') },
            }),
            data: createdUser,
        };
    }
}