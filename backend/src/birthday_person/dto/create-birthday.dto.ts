import { IsString, IsDate, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';
import { SocialCircle } from 'generated/prisma/client';

export class CreateBirthdayDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  birthday_date: Date;

  @IsEnum(SocialCircle)
  @IsNotEmpty()
  social_circle: SocialCircle;
}
