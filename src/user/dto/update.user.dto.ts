import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly username?: string;

  @IsString()
  readonly password?: string;

  @IsString()
  readonly userGroup?: string;
}
