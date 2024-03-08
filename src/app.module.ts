import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './User/user.controller';
import { UserService } from './User/user.service';
import { ConfigModule } from '@nestjs/config';
import { ArtistController } from './Artist/artist.controller';
import { ArtistService } from './Artist/artist.service';
import { AlbumController } from './Album/album.controller';
import { AlbumService } from './Album/album.service';
import { TrackController } from './Track/track.controller';
import { TrackService } from './Track/track.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    UserController,
    ArtistController,
    AlbumController,
    TrackController,
  ],
  providers: [
    AppService,
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
  ],
})
export class AppModule {}
