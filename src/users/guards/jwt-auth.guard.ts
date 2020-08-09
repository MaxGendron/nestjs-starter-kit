import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/* Use this JwtAuthGuard if you wanna restreint a route to a logged in user */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}