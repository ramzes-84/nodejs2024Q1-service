import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { FindID } from 'src/User/Dto/types';
import { CreateArtistDto } from './Dto/types';

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

  //   @Put(':id')
  //   @Header('content-type', 'application/json')
  //   updatePassw(
  //     @Param() params: FindID,
  //     @Body() updatePasswordDto: UpdatePasswordDto,
  //   ) {
  //     const user = this.artistService.updatePassw(params, updatePasswordDto);
  //     if (typeof user === 'undefined') {
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     } else if (!user) {
  //       throw new HttpException('Incorrect old password', HttpStatus.FORBIDDEN);
  //     }
  //     return user;
  //   }

  //   @Delete(':id')
  //   @Header('content-type', 'application/json')
  //   @HttpCode(HttpStatus.NO_CONTENT)
  //   delete(@Param() params: FindID) {
  //     this.artistService.delete(params);
  //   }
}
