import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { auth } from '../../lib/auth';
import { fromNodeHeaders } from 'better-auth/node';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const session = await this.authService.auth.api.getSession({
      headers: fromNodeHeaders(req.headers as any),
    });
    if (session && session.user) {
      return true;
    }
    return false;
  }
}
