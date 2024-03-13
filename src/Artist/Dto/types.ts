import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Cris Rea' })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  grammy: boolean;
}

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Cris Rea' })
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ example: true })
  grammy: boolean;
}
