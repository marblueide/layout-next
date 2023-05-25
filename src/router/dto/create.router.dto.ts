import { IsString } from 'class-validator';

export class CreateRouterDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly router: string;

  readonly userGroup: string[];
}
