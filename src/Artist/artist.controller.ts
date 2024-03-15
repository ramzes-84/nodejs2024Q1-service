import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { FindID } from 'src/types';
import { CreateArtistDto, UpdateArtistDto } from './Dto/types';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  @Header('content-type', 'application/json')
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  getArtistById(@Param() params: FindID) {
    const searchResult = this.artistService.getArtistById(params);
    return searchResult;
  }

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  updateArtist(
    @Param() params: FindID,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(params, updateArtistDto);
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: FindID) {
    await this.artistService.delete(params);
  }
}
