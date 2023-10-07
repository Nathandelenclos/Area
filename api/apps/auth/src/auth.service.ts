import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@app/common/users/user.service';
import { NewUser } from '@app/common/users/user.dto';
import MicroServiceResponse from '@app/common/micro.service.response';
//import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Register a new user
   * @param data NewUser
   * @returns MicroServiceResponse
   */
  register(data: NewUser) {
    return this.userService.create(data);
  }

  /**
   * Sign in a user with credentials and return a JWT
   * @param email string
   * @param password string
   * @returns MicroServiceResponse
   */
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      return new MicroServiceResponse({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
    const isMatch = password == user.password; // await compare(password, user.password);

    if (!isMatch) {
      return new MicroServiceResponse({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
