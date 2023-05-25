import { IsString } from 'class-validator';

export class CreateRouterDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly path: string;

  readonly userGroup: string[];
}
