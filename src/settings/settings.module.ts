import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingSchema, Setting } from './models/schemas/setting.schema';
import { JwtStrategy } from 'src/users/strategy/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }])],
  controllers: [SettingsController],
  providers: [SettingsService, JwtStrategy],
})
export class SettingsModule {}
