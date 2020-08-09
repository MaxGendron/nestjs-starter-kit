import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CustomError } from 'src/models/custom-error';
import { UsersService } from './users.service';

//Using Passport.Local strategy
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  //Validate if the given credentials exist in the system
  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new HttpException(
        new CustomError(HttpStatus.BAD_REQUEST, 'NotFound', 'No user found'),
        HttpStatus.BAD_REQUEST
      );
    }
    return user;
  }
}