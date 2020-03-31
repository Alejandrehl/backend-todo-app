import { CreateUserDto } from './create-user-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    const user = new User();

    user.name = newUser.name;
    user.lastname = newUser.lastname;
    user.email = newUser.email;

    await bcrypt
      .hash(newUser.password, 10)
      .then(hash => (user.password = hash));

    return await this.userRepository.save(user);
  }
}
