import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/User/user.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'node:process';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
