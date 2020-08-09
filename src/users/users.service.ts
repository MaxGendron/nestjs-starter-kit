import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/schemas/user.schema';
import { NewUserDto } from './models/dtos/new-user.dto';
import { QueryDto } from '../models/dtos/query.dto';
import { CustomError } from 'src/models/custom-error';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
    private jwtService: JwtService) {}

  //Create a new user
  async create(newUserDto: NewUserDto): Promise<any> {
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
    const salt = await bcrypt.genSalt(+this.configService.get<number>('BCRYPT_ROUND'));
    newUserDto.password = await bcrypt.hash(newUserDto.password, salt);

    //Save the user
    const newUser = new this.userModel(newUserDto);
    newUser.save();
    //Log the user
    return this.login(newUser);
  }

  //Return a JWT Token and the username of the user
  async login(user: User): Promise<any> {
    const token = this.jwtService.sign(
      { username: user.username, sub: user._id },
      { algorithm: 'HS512', expiresIn: '24h', issuer: this.configService.get<string>('JWT_ISSUER') }
    );
    return {
      username: user.username,
      token: token
    };
  }

  //Validate if a user exist by looking at the number of document returned by the query
  async exist(queryDto: QueryDto): Promise<any> {
    const count = await this.userModel.countDocuments(queryDto.query).exec();
    return {
      exist: count > 0
    }
  }

  //Validate if the given credentials exist in the system
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne(username);
    //Verify password
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      }
    }
    return null;
  }

  //Look for the associated doc in the DB, username can be the email or the username
  findOne(username: string): Promise<User> {
    return this.userModel.findOne({
      '$or': [
        {username: username},
        {email: username}
      ]
    }).exec();
  }
}
