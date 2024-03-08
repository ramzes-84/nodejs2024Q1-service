import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  grammy: boolean;
}

// export class UpdatePasswordDto {
//   @IsString()
//   @IsNotEmpty()
//   oldPassword: string;

//   @IsString()
//   @IsNotEmpty()
//   newPassword: string;
// }
