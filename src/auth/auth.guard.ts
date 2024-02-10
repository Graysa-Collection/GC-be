import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from './public.decorator';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeaders(request.headers);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      const user = await this.usersService.findOneByEmail(payload.email);
      request['user'] = user;
    } catch (error: unknown) {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractTokenFromHeaders(headers: IncomingHttpHeaders): string | null {
    if (!headers.authorization) {
      return null;
    }

    const [type, token] = headers.authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
