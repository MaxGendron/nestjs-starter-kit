/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { QueryDto } from '../models/dtos/query.dto';
import { NewUserDto } from './models/dtos/new-user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Post()
  create(@Body() newUserDto: NewUserDto): Promise<any> {
    return this.usersService.create(newUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any): Promise<any> {
    return this.usersService.login(req.user);
  }

  @Post('exist')
  exist(@Body() queryDto: QueryDto): Promise<any> {
    return this.usersService.exist(queryDto);
  }
}
