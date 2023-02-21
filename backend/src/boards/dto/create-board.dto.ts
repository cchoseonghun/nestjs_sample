import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBoardDto {
  @IsString()
  readonly title: string;
  
  @IsString()
  readonly content: string;
  
  @Type(() => Number)
  @IsNumber()
  readonly writerId: number;

  @Type(() => Number)
  @IsNumber()
  readonly joinLimit: number;

  @IsOptional()
  imagePath: string;
}