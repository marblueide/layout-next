import { IsString } from 'class-validator';

export class CreatePageDto {
  @IsString()
  readonly pageName: string;

  @IsString()
  readonly router: string;

  @IsString()
  readonly user: string;

  @IsString()
  readonly pageData: string;

  @IsString()
  readonly describe: string;
}
