/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, Body, UseGuards, Request, HttpCode } from '@nestjs/common';
import { QueryDto } from '../models/dtos/query.dto';
import { NewUserDto } from './models/dtos/new-user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './models/dtos/login.dto';
import { ApiTags, ApiBody, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { LoggedUserResponseDto } from './models/dtos/responses/logged-user.response.dto';
import { ExistReponseDto } from '../models/dtos/responses/exist.response.dto';
import { ApiUnexpectedErrorResponse, CustomApiBadRequestResponse, CustomApiNotFoundResponse } from 'src/models/api-response';

@ApiTags('Users')
@ApiUnexpectedErrorResponse()
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create User', description: 'Create a new User.' })
  @ApiCreatedResponse({ description: 'The user has been created', type: LoggedUserResponseDto})
  @CustomApiBadRequestResponse('Cannot Insert the requested user, verify your information.')
  create(@Body() newUserDto: NewUserDto): Promise<LoggedUserResponseDto> {
    return this.usersService.create(newUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({type: LoginDto})
  @ApiOperation({ summary: 'Login a user', description: 'Try to login the user by validating if he exist or not.' })
  @CustomApiNotFoundResponse('No user was found for the given credentials.')
  @ApiOkResponse({ description: 'The user exist and has a token was created', type: LoggedUserResponseDto})
  login(@Request() req: any): Promise<LoggedUserResponseDto> {
    return this.usersService.login(req.user);
  }

  @Post('exist')
  @HttpCode(200)
  @ApiOperation({ summary: 'Validate if a user exist', description: 'Validate if a user exist by looking at the number of document returned by the query.' })
  @ApiOkResponse({ description: 'The user exist.', type: ExistReponseDto})
  @CustomApiBadRequestResponse()
  exist(@Body() queryDto: QueryDto): Promise<ExistReponseDto> {
    return this.usersService.exist(queryDto);
  }
}
