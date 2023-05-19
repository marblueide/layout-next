import { IsString } from 'class-validator';

export class CreateComponentLibraryDto {
  @IsString()
  libName: string;

  @IsString()
  description: string;
}
