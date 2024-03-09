import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Road To Hell' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 180 })
  duration: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '0a35dd62-e09f-444b-a628-f4e7c6954f57' })
  artistId: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '0a35dd62-e09f-444b-a628-f4e7c6954f57' })
  albumId: string | null;
}

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Road To Hell' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 180 })
  duration: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '0a35dd62-e09f-444b-a628-f4e7c6954f57' })
  artistId: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '0a35dd62-e09f-444b-a628-f4e7c6954f57' })
  albumId: string | null;
}
