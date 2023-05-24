import { IsString } from 'class-validator';

export class CreateComponentDto {
  @IsString()
  componentName: string;

  @IsString()
  ComponentData: string;

  @IsString()
  libId: string;
}
