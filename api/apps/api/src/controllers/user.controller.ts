import { Controller, Get, Req } from '@nestjs/common';
import { AppletService } from '@app/common/applets/applet.service';
import { UserService } from '@app/common/users/user.service';

@Controller()
export class UserController {
  constructor(
    private readonly appletService: AppletService,
    private readonly userService: UserService,
  ) {}

  @Get('me')
  async getMe(@Req() req) {
    const user = await this.userService.findOne(req.user);
    return user;
  }
}
