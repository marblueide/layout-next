import { IsString } from 'class-validator';

export class UpdateComponentLibraryDto {
  @IsString()
  id: string;

  @IsString()
  libName?: string;

  @IsString()
  description?: string;
}
