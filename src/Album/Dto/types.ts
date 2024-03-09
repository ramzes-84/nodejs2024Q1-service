import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Nevermind' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1991 })
  year: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '0a35dd62-e09f-444b-a628-f4e7c6954f57' })
  artistId: string | null;
}

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Nevermind' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1991 })
  year: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '0a35dd62-e09f-444b-a628-f4e7c6954f57' })
  artistId: string | null;
}
