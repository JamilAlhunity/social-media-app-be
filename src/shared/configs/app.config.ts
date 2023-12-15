import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModuleOptions, ConfigService } from '@nestjs/config/dist';
import * as Joi from 'joi';

export const jwtOptions: JwtModuleAsyncOptions = {
    useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('USER_ACCESS_TOKEN_SECRET')!,
    }),
    global: true,
    inject: [ConfigService],
};


export const configOptions: ConfigModuleOptions = {
    envFilePath: `.${process.env.NODE_ENV ?? 'development'}.env`,
    isGlobal: true,
    cache: true,
    validationSchema: Joi.object({
        NODE_ENV: Joi.string()
            .min(3)
            .max(6)
            .valid('dev', 'prod', 'stable')
            .required(),
        PORT: Joi.number().default(3000),
        USER_ACCESS_TOKEN_SECRET: Joi.string().min(10).required(),
        USER_ACCESS_TOKEN_EXPIRES_IN: Joi.string().min(1).required(),
        ALLOWED_HOSTS: Joi.string().min(1).required(),
        PREFIX: Joi.string().min(3).max(10).required(),
        APP_NAME: Joi.string().min(3).max(30).required(),
    }),
};
