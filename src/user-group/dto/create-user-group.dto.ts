import { IsString } from 'class-validator';

export class CreateUserGroupDto {
  @IsString()
  readonly groupName: string;

  @IsString()
  readonly rules: string;

  @IsString()
  status: number;
}
