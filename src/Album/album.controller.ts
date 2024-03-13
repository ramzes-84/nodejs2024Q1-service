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
import { AlbumService } from './album.service';
import { FindID } from 'src/types';
import { CreateAlbumDto, UpdateAlbumDto } from './Dto/types';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get()
  @Header('content-type', 'application/json')
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  getAlbumById(@Param() params: FindID) {
    const searchResult = this.albumService.getAlbumById(params);
    return searchResult;
  }

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  updateAlbum(@Param() params: FindID, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.updateAlbum(params, updateAlbumDto);
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() params: FindID) {
    this.albumService.delete(params);
  }
}
