import { IsNotEmpty } from 'class-validator';

export class QueryDto {
  @IsNotEmpty()
  query: any;
}