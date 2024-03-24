import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { FavoriteController } from './Favorites/favs.controller';
import { FavoriteService } from './Favorites/favs.service';
import { LoggerModule } from './Logger/logger.module';
import { LoggerMiddleware } from './Middleware/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot(), LoggerModule],
  controllers: [
    AppController,
    UserController,
    ArtistController,
    AlbumController,
    TrackController,
    FavoriteController,
  ],
  providers: [
    AppService,
    UserService,
    ArtistService,
    AlbumService,
    TrackService,
    FavoriteService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        AppController,
        UserController,
        ArtistController,
        AlbumController,
        TrackController,
        FavoriteController,
      );
  }
}
