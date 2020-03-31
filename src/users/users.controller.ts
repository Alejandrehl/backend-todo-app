import { CreateUserDto } from './create-user-dto';
import { UsersService } from './users.service';
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Post()
  register(@Body() createUserDto: CreateUserDto, @Res() response) {
    this.usersServices
      .register(createUserDto)
      .then(token => response.status(HttpStatus.CREATED).json(token))
      .catch(err =>
        response.status(HttpStatus.FORBIDDEN).json({ message: err.message }),
      );
  }
}
