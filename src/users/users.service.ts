import { CreateUserDto } from './create-user-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async register(newUser: CreateUserDto): Promise<any> {
    const user = new User();

    user.name = newUser.name;
    user.lastname = newUser.lastname;
    user.email = newUser.email;

    await bcrypt
      .hash(newUser.password, 10)
      .then(hash => (user.password = hash));

    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;

    return this.jwtService.sign(result);
  }
}
