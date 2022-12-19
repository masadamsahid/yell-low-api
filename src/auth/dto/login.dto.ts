import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  usernameEmail: string;
  
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
