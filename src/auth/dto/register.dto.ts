import {
  IsAlphanumeric,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsDefined,
  IsString,
  IsEmail,
  IsInt,
  Length,
} from "class-validator";
import { Match } from "./match.decorator";

export class RegisterDto {
  @IsNotEmpty()
  @Length(4,32)
  @IsLowercase()
  @IsAlphanumeric()
  username: string;
  
  @IsDefined()
  @IsString()
  @Length(4,32)
  password: string;
  
  @IsDefined()
  @IsString()
  @Length(4,32)
  @Match(
    RegisterDto,
    (r) => r.password,
    { message: 'Password must match' }
  )
  confirmPassword: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsOptional()
  @IsInt()
  age?: number;
}
