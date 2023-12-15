import { HttpStatus, Injectable } from '@nestjs/common';
import { CacheService } from 'core/lib/cache/cache.service';

@Injectable()
export class LogoutService {
    constructor(private cacheService: CacheService) { }

    public async logoutUser(userID: number) {
        await this.cacheService.del(userID + '')
        return {
            message: 'logged in successfully',
            httpStatus: HttpStatus.OK,
        };
    }
}