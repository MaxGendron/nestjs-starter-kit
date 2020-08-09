import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/schemas/user.schema';
import { NewUserDto } from './models/dtos/new-user.dto';
import { ValidateUserDto } from './models/dtos/validate-user.dto';
import { QueryDto } from '../models/dtos/query.dto';
import { CustomError } from 'src/models/custom-error';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //Create a new user
  async create(newUserDto: NewUserDto): Promise<User> {
    //Check if the user already exist, if so return error
    //Sanity check, shouldn't happens since we're validating on the UI
    const count = await this.userModel.countDocuments({
      '$or': [
        {username: newUserDto.username},
        {email: newUserDto.email}
      ]
    }).exec();

    if (count > 0) {
      throw new HttpException(
        new CustomError(HttpStatus.BAD_REQUEST, 'CannotInsert', 'Cannot Insert the requested user, verify your information'),
        HttpStatus.BAD_REQUEST
      );
    }

    //Encrypt the password
    const salt = await bcrypt.genSalt(10);
    newUserDto.password = await bcrypt.hash(newUserDto.password, salt);
    
    //Save the user
    const newUser = new this.userModel(newUserDto);
    return newUser.save();
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
