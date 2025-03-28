import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class User {
}

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  return ctx.switchToHttp().getRequest<{ user: User }>().user;
});
