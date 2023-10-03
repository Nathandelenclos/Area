import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@app/common/users/user.service';
import { NewUser } from '@app/common/users/user.dto';
import MicroServiceResponse from '@app/common/micro.service.response';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: NewUser) {
    const user = await this.userService.create(data);
    return new MicroServiceResponse({
      data: user,
    });
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return new MicroServiceResponse({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const payload = { id: user.id, email: user.email };
    return new MicroServiceResponse({
      data: {
        access_token: this.jwtService.sign(payload),
      },
    });
  }
}
