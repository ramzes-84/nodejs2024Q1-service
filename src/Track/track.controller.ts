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
import { TrackService } from './track.service';
import { FindID } from 'src/types';
import { CreateTrackDto, UpdateTrackDto } from './Dto/types';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  @Header('content-type', 'application/json')
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  getTrackById(@Param() params: FindID) {
    const searchResult = this.trackService.getTrackById(params);
    return searchResult;
  }

  @Post()
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  updateTrack(@Param() params: FindID, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.updateTrack(params, updateTrackDto);
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: FindID) {
    await this.trackService.delete(params);
  }
}
