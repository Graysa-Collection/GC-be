import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './auth.constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT_CONSTANTS.secret,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
