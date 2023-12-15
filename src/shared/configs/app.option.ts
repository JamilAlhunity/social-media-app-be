import { Provider } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AccessTokenGuard } from "core/guards/access-token.guard";

const accessTokenGuardProvider: Provider<AccessTokenGuard> = {
    provide: APP_GUARD,
    useClass: AccessTokenGuard,
};

export const guards = [accessTokenGuardProvider];