import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/verifyEmail')
  async sendVerification(@Body() body) {
    return await this.usersService.sendVerification(body.email);
  }

  @Put('/verifyEmail')
  async verifyEmail(@Body() body, @Query() query) {
    const { verifyToken } = query;
    return await this.usersService.verifyEmail(body.email, parseInt(verifyToken));
  }
}
