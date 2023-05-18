import { IsString } from 'class-validator';

export class PageUpdateDto {
  @IsString()
  id: string;

  @IsString()
  readonly pageName: string;

  @IsString()
  readonly router: string;

  @IsString()
  readonly user: string;

  @IsString()
  readonly pageData: string;
}
