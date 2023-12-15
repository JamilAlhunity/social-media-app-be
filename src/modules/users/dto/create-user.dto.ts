import { Allow, IsEmail, IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IsContainsLowercase } from 'core/decorators/is-contains-lower-case.decorator';
import { Gender } from 'shared/enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'resources/generated/i18n.generated';
export class CreateUserDto {

    @Allow()
    id!: number;


    @ApiProperty({
        description: "User's username",
        example: 'jamil',
        isArray: false,
        maxLength: 30,
        minLength: 3,
        name: 'username',
        required: true,
        type: String,
    })
    @IsString()
    @IsNotEmpty({
        message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
    })
    username!: string;


    @ApiProperty({
        description: "User's email",
        example: 'jamil@gmail.com',
        isArray: false,
        maxLength: 320,
        minLength: 5,
        name: 'email',
        required: true,
        type: String,
    })
    @MaxLength(320)
    @MinLength(5)
    @IsEmail(undefined, {
        message: i18nValidationMessage<I18nTranslations>('validation.email'),
    })
    @IsString()
    @IsNotEmpty()
    email!: string;


    @ApiProperty({
        description: "User's password",
        example: 'jamil_123',
        isArray: false,
        maxLength: 30,
        minLength: 8,
        name: 'password',
        required: true,
        type: String,
    })
    @MaxLength(32)
    @MinLength(8)
    @IsString()
    @IsContainsLowercase({
        message: i18nValidationMessage<I18nTranslations>(
            'validation.passwordContains.lowercase',
        ),
    })
    @IsNotEmpty()
    password!: string;


    @ApiProperty({
        description: "User's gender",
        example: 'male',
        isArray: false,
        name: 'gender',
        required: true,
        type: Number,
        enum: Gender,
    })
    @IsEnum(Gender)
    @IsNumber(
        { allowInfinity: false, allowNaN: false },
        { message: 'Gender must be a number' },
    )
    @IsNotEmpty()
    gender!: Gender;



    @IsISO8601()
    @IsNotEmpty()
    birthday!: string;

    @MaxLength(20)
    @MinLength(3)
    @IsNotEmpty()
    @IsOptional()
    city?: string;
}
