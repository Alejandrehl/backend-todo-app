import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  HttpStatus,
  UnauthorizedException,
  Req,
  Res,
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
}
