export class LoggedUserResponseDto {
  constructor(
    public username: string,
    public token: string
  ) {}
}