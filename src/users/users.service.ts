import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/schemas/user.schema';
import { NewUserDto } from './models/dtos/new-user.dto';
import { ValidateUserDto } from './models/dtos/validate-user.dto';
import { QueryDto } from '../models/dtos/query.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //Create a new user
  create(newUserDto: NewUserDto) {
    return "create user";
  }

  //Validate that the given username/password correspond to a user in the system
  validate(validateUserDto: ValidateUserDto): string {
    return "validate user";
  }

  //Validate if a user exist by looking at the number of document returned by the query
  exist(queryDto: QueryDto): string {
    return "user exist";
  }
}
