import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as jwtDecode from 'jwt-decode';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const match = await bcrypt.compare(pass, user.password);

    if (!match) return null;

    const { password, ...result } = user;
    return this.jwtService.sign(result);
  }

  async validateToken(token: string): Promise<any> {
    return await jwtDecode(token);
  }
}
