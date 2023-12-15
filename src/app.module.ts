import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { JwtModule } from '@nestjs/jwt';
import { ModulesModule } from 'modules/modules.module';
import { CacheModule } from 'core/lib/cache/cache.module';
import { guards } from 'shared/configs/app.config';
import { configOptions, i18nOptions, jwtOptions } from 'shared/configs/app.option';
import { I18nModule } from 'nestjs-i18n';
@Module({
  imports: [
    I18nModule.forRoot(i18nOptions),
    ConfigModule.forRoot(configOptions),
    JwtModule.registerAsync(jwtOptions),
    CacheModule.register('cache-manager-redis-yet'),
    ModulesModule,
  ],
  controllers: [],
  providers: [...guards],
})
export class AppModule { }
