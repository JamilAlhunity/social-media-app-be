import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
import { ModulesModule } from 'modules/modules.module';
import { configOptions, jwtOptions } from 'shared/configs/app.config';
import { guards } from 'shared/configs/app.option';
@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    JwtModule.registerAsync(jwtOptions),
    ModulesModule,
  ],
  controllers: [],
  providers: [...guards],
})
export class AppModule { }
