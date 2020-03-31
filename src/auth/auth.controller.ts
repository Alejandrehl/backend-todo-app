import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  HttpStatus,
  UnauthorizedException,
  Req,
  Res,
  Get,
  Param,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Req() request, @Res() response) {
    const { email, password } = request.body;

    this.authService
      .validateUser(email, password)
      .then(user => {
        if (!user) throw new UnauthorizedException();
        return response.status(HttpStatus.OK).json(user);
      })
      .catch(err => response.status(HttpStatus.FORBIDDEN).json(err));
  }

  @Get(':token')
  async loadUser(@Param('token') token, @Res() response) {
    this.authService
      .validateToken(token)
      .then(user => {
        if (Date.now() >= user.exp * 1000) throw new UnauthorizedException();
        response.status(HttpStatus.OK).json(user);
      })
      .catch(err => response.status(HttpStatus.FORBIDDEN).json(err.message));
  }
}
