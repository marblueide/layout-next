import { IsString } from 'class-validator';

export class UpdateUserGroupDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly groupName?: string;

  @IsString()
  readonly rules?: string;

  @IsString()
  status?: number;
}
