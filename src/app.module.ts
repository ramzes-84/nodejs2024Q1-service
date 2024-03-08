import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './User/user.controller';
import { UserService } from './User/user.service';
import { ConfigModule } from '@nestjs/config';
import { ArtistController } from './Artist/artist.controller';
import { ArtistService } from './Artist/artist.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UserController, ArtistController],
  providers: [AppService, UserService, ArtistService],
})
export class AppModule {}
