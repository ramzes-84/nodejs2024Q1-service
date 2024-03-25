import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favs.service';
import { FindID } from 'src/types';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}
  @Get()
  @Header('content-type', 'application/json')
  getAll() {
    return this.favoriteService.getAllFavs();
  }

  @Post('track/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param() params: FindID) {
    return this.favoriteService.addTrack(params);
  }

  @Post('album/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param() params: FindID) {
    return this.favoriteService.addAlbum(params);
  }

  @Post('artist/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param() params: FindID) {
    return this.favoriteService.addArtist(params);
  }

  @Delete('track/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param() params: FindID) {
    await this.favoriteService.deleteTrack(params);
  }

  @Delete('album/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param() params: FindID) {
    await this.favoriteService.deleteAlbum(params);
  }

  @Delete('artist/:id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param() params: FindID) {
    await this.favoriteService.deleteArtist(params);
  }
}
