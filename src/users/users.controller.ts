import { Controller, Post, Body } from '@nestjs/common';
import { QueryDto } from './models/dtos/query.dto';
import { NewUserDto } from './models/dtos/new-user.dto';
import { ValidateUserDto } from './models/dtos/validate-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() newUserDto: NewUserDto): string {
    return "create user";
  }

  @Post('validate')
  validate(@Body() validateUserDto: ValidateUserDto): string {
    return "validate user";
  }

  @Post('exist')
  exist(@Body() queryDto: QueryDto): string {
    
    return "user exist";
  }
}
