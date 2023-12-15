import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CacheService } from 'core/lib/cache/cache.service';

@Injectable()
export class UsersService {
  users: User[] = [];

  constructor(private cacheService: CacheService) { }

  createUserForAuth(createUserDto: CreateUserDto): User {
    const { email } = createUserDto;

    const user = this.findUserByEmail(email);

    if (!!user)
      throw new HttpException("Email already exists, please choose another email", HttpStatus.CONFLICT)

    let length: number = this.users.length + 1;

    const createdUser = new User({
      ...createUserDto,
      id: length++,
    });

    this.users.push(createdUser);

    return createdUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id == id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    user.updateOne(updateUserDto);
    return {
      data: user,
      message: 'Updated User Successfully',
      statusCode: HttpStatus.OK,
    };
  }

  async remove(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    await this.cacheService.del(id + '');
    return {
      data: this.users,
      message: 'deleted User Successfully',
      statusCode: HttpStatus.OK,
    };
  }

  findUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
