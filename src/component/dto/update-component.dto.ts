import { IsString } from 'class-validator';

export class UpdateComponentDto {
  @IsString()
  id: string;

  @IsString()
  componentName?: string;

  @IsString()
  ComponentData?: string;

  @IsString()
  libId?: string;
}
