import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateBoardDto {
  @IsString()
  readonly title: string;
  
  @IsString()
  readonly content: string;
  
  // FormData에 담긴 value는 모두 string이 되버린다.
  // 해당 값을 number type으로 받아야 하는 상황에서
  // 어째서인지 FormData 안에 든 값에 대해선 class-validator가 변환하지 못했는데,
  // @IsNumberString() 사용해
  // 일단 string일지라도 pass되게해서 변환해서 쓰자라는 생각을 했지만
  // readonly라는 속성 때문에 직접 변환하지도 못하는 상황이었다.
  // https://github.com/nestjs/nest/issues/1331
  // 하지만 위 링크에서의 도움으로 
  // @Type(() => Number)
  // @IsNumber()
  // 위 두 데코레이터를 쓰면 변환해 받아지는 것을 확인.
  @Type(() => Number)
  @IsNumber()
  readonly writerId: number;

  @Type(() => Number)
  @IsNumber()
  readonly joinLimit: number;
}