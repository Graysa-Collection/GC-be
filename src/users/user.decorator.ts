import { IRequestWithUser } from '@/roles/roles.guard';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserExtract = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    return request.user;
  },
);
