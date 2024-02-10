import { Role } from '@/roles/roles.enum';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from '@/roles/roles.guard';
import { Roles } from '@/roles/roles.decorator';

export function Auth(roles: Role[]) {
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
}
