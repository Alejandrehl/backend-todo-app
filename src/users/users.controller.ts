import { CreateUserDto } from './create-user-dto';
import { UsersService } from './users.service';
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() response) {
    this.usersServices
      .createUser(createUserDto)
      .then(res => response.status(HttpStatus.CREATED).json(res))
      .catch(err =>
        response.status(HttpStatus.FORBIDDEN).json({ message: err.message }),
      );
  }
}
