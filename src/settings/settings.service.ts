import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SettingDto } from './models/dtos/setting.dto';
import { Setting } from './models/schemas/setting.schema';
import { ThrowExceptionUtils } from 'src/utils/throw-exception.utils';

@Injectable()
export class SettingsService {
  private readonly entityType = 'User';

  constructor(
    @InjectModel(Setting.name) private settingModel: Model<Setting>,
  ) {}

  //Create a new setting
  createSetting(settingDto: SettingDto): Promise<Setting> {
    const newSetting = new this.settingModel(settingDto);
    return newSetting.save();
  }

  //Update a existing setting
  async updateSetting(id: string, settingDto: SettingDto): Promise<Setting> {
    const setting = await this.settingModel
      .findByIdAndUpdate(id, settingDto, { new: true })
      .exec();
    if (!setting) {
      ThrowExceptionUtils.notFoundException(this.entityType, id);
    }
    return setting;
  }

  //Delete a existing setting
  async deleteSetting(id: string): Promise<void> {
    const setting = await this.settingModel.findByIdAndRemove(id).exec();
    if (!setting) {
      ThrowExceptionUtils.notFoundException(this.entityType, id);
    }
  }

  //Get a setting by is name
  async getSettingByName(settingName: string): Promise<Setting> {
    const setting = await this.settingModel
      .findOne({ settingName: settingName })
      .exec();
    if (!setting) {
      ThrowExceptionUtils.notFoundException(
        this.entityType,
        settingName,
        'settingName',
      );
    }
    return setting;
  }

  //Get a setting by is id
  async getSettingById(id: string): Promise<Setting> {
    const setting = await this.settingModel.findById(id).exec();
    if (!setting) {
      ThrowExceptionUtils.notFoundException(this.entityType, id);
    }
    return setting;
  }

  //Get all the settings
  getSettings(): Promise<Setting[]> {
    return this.settingModel.find().exec();
  }
}
