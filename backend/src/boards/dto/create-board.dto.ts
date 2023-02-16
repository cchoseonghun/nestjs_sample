import { IsNumber, IsString } from "class-validator";

export class CreateBoardDto {
  @IsString()
  readonly title: string;
  
  @IsString()
  readonly content: string;
  
  @IsNumber()
  readonly writerId: number;

  @IsNumber()
  readonly joinLimit: number;
}