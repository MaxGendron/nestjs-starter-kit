import { IsNotEmpty } from 'class-validator';

export class SettingDto {
  @IsNotEmpty()
  settingName: string;
}
