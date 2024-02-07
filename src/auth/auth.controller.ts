import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './sign-in.dto';
import { SignUpDto } from './sign-up.dto';
import { handleErrorResponse } from '@/utils/handleErrorResponse';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const accessToken = await this.authService.signIn(signInDto);
      return res.json({ accessToken });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    try {
      const accessToken = await this.authService.signUp(signUpDto);
      return res.json({ accessToken });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
