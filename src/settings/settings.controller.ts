import {
  Controller,
  Body,
  Post,
  Put,
  Param,
  Delete,
  Get,
  HttpCode,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import {
  ApiUnexpectedErrorResponse,
  CustomApiBadRequestResponse,
} from 'src/models/api-response';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { SettingDto } from './models/dtos/setting.dto';
import { Setting } from './models/schemas/setting.schema';
import { MongoIdDto } from 'src/models/dtos/mongo-id.dto';

@ApiTags('Settings')
@ApiUnexpectedErrorResponse()
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create setting',
    description: 'Create a new Setting.',
  })
  @ApiCreatedResponse({
    description: 'The setting has been created',
    type: Setting,
  })
  @CustomApiBadRequestResponse(
    'Cannot Insert the requested item, duplicate key error on a attribute.',
  )
  createSetting(@Body() settingDto: SettingDto): Promise<Setting> {
    return this.settingsService.createSetting(settingDto);
  }

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
  updateSetting(
    @Param() mongoIdDto: MongoIdDto,
    @Body() settingDto: SettingDto,
  ): Promise<Setting> {
    return this.settingsService.updateSetting(mongoIdDto.id, settingDto);
  }

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
  deleteSetting(@Param() mongoIdDto: MongoIdDto): void {
    this.settingsService.deleteSetting(mongoIdDto.id);
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
