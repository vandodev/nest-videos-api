import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateVideoDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  title: string;

 
  @IsString()
  @IsOptional()
  description: string | null;

  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  category_id: number;
}
