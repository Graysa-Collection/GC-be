import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './sign-in.dto';
import { SignUpDto } from './sign-up.dto';
import { handleErrorResponse } from '@/utils/handleErrorResponse';
import { Response } from 'express';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const accessToken = await this.authService.signIn(signInDto);
      return res.json({ accessToken });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }

  @Post('signup')
  @Public()
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    try {
      const accessToken = await this.authService.signUp(signUpDto);
      return res.json({ accessToken });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
