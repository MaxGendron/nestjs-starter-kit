import { Controller, Post, Body } from '@nestjs/common';
import { QueryDto } from './models/query.dto';
import { NewUserDto } from './models/new-user.dto';
import { ValidateUserDto } from './models/validate-user.dto';

@Controller('users')
export class UsersController {
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
