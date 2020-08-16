import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SettingDto } from './models/dtos/setting.dto';
import { Setting } from './models/schemas/setting.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private settingModel: Model<Setting>,
  ) {}

  //Create a new setting
  createSetting(settingDto: SettingDto): Promise<Setting> {
    const newSetting = new this.settingModel(settingDto);
    return newSetting.save();
  }

  //Update a existing setting
  updateSetting(id: string, settingDto: SettingDto): Promise<Setting> {
    return this.settingModel.findByIdAndUpdate(id, settingDto, { new: true });
  }

  //Delete a existing setting
  deleteSetting(id: string): void {
    this.settingModel.findByIdAndRemove(id).exec();
  }

  //Get a setting by is name
  getSettingByName(settingName: string): Promise<Setting> {
    return this.settingModel.findOne({ settingName: settingName }).exec();
  }

  //Get a setting by is id
  getSettingById(id: string): Promise<Setting> {
    return this.settingModel.findById(id).exec();
  }

  //Get all the settings
  getSettings(): Promise<Setting[]> {
    return this.settingModel.find().exec();
  }
}
