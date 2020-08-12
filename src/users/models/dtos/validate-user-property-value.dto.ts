import { IsNotEmpty } from "class-validator";

export class ValidateUserPropertyValueDto {
  @IsNotEmpty()
  property: UserPropertyEnum
  @IsNotEmpty()
  value: string
}

export enum UserPropertyEnum {
  Username = 'username',
  Email = 'email'
}