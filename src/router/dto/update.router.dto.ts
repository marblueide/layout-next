import { IsString } from 'class-validator';

export class UpdateRouterDto {
  @IsString()
  readonly id?: string;

  @IsString()
  readonly name?: string;

  @IsString()
  readonly router?: string;

  readonly userGroup?: string[];
}
