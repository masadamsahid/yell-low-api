import { IsDefined, IsInt, IsString, IsUrl, Length, } from "class-validator";

export class CreatePostDto {
  
  @IsDefined()
  @IsString()
  @Length(1, 240)
  yell: string;
  
  @IsUrl()
  imgUrl: string;
  
  @IsDefined()
  @IsInt()
  postType: number;
}
