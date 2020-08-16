import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDocument } from 'src/models/base-document';

@Schema()
export class Setting extends BaseDocument {
  @ApiProperty()
  @Prop({ unique: true })
  settingName: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
