import { Controller, Body, Post, Put, Param, Delete, Get, HttpCode, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import {
  ApiUnexpectedErrorResponse,
  CustomApiBadRequestResponse,
  CustomApiNotFoundResponse,
} from 'src/common/models/api-response';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SettingDto } from './models/dtos/setting.dto';
import { Setting } from './models/schemas/setting.schema';
import { MongoIdDto } from 'src/common/models/dtos/mongo-id.dto';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';
import { Roles } from 'src/common/models/roles.decorator';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { UserRoleEnum } from 'src/users/models/enum/user-role.enum';

@ApiTags('Settings')
@ApiUnexpectedErrorResponse()
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Roles(UserRoleEnum.Admin)
  @UseGuards(RolesGuard)
  @Post()
  @ApiOperation({
    summary: 'Create setting',
    description: 'Create a new Setting.',
  })
  @ApiCreatedResponse({
    description: 'The setting has been created',
    type: Setting,
  })
  @CustomApiBadRequestResponse('Cannot Insert the requested item, duplicate key error on a attribute.')
  createSetting(@Body() settingDto: SettingDto): Promise<Setting> {
    return this.settingsService.createSetting(settingDto);
  }

  @Roles(UserRoleEnum.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  @ApiOperation({
    summary: 'Update setting',
    description: 'Update a existing Setting.',
  })
  @ApiOkResponse({
    description: 'The setting has been updated',
    type: Setting,
  })
  @CustomApiBadRequestResponse()
  @CustomApiNotFoundResponse('No setting found.')
  updateSetting(@Param() mongoIdDto: MongoIdDto, @Body() settingDto: SettingDto): Promise<Setting> {
    return this.settingsService.updateSetting(mongoIdDto.id, settingDto);
  }

  @Roles(UserRoleEnum.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete setting',
    description: 'Delete a existing Setting.',
  })
  @ApiNoContentResponse({
    description: 'The setting has been deleted',
  })
  @CustomApiBadRequestResponse()
  @CustomApiNotFoundResponse('No setting found.')
  async deleteSetting(@Param() mongoIdDto: MongoIdDto): Promise<void> {
    await this.settingsService.deleteSetting(mongoIdDto.id);
  }

  @Get('/findbyname/:settingName')
  @ApiOperation({
    summary: 'Get setting by name',
    description: 'Get a Setting by is name.',
  })
  @ApiOkResponse({
    description: 'The setting has been found and returned',
    type: Setting,
  })
  @CustomApiBadRequestResponse()
  @CustomApiNotFoundResponse('No setting found.')
  getSettingByName(@Param() settingDto: SettingDto): Promise<Setting> {
    return this.settingsService.getSettingByName(settingDto.settingName);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get setting by id',
    description: 'Get a Setting by is id.',
  })
  @ApiOkResponse({
    description: 'The setting has been found and returned',
    type: Setting,
  })
  @CustomApiBadRequestResponse()
  @CustomApiNotFoundResponse('No setting found.')
  getSettingById(@Param() mongoIdDto: MongoIdDto): Promise<Setting> {
    return this.settingsService.getSettingById(mongoIdDto.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get settings',
    description: 'Get all the settings.',
  })
  @ApiOkResponse({
    description: 'The settings have been found and returned',
    type: Setting,
  })
  getSettings(): Promise<Setting[]> {
    return this.settingsService.getSettings();
  }
}
