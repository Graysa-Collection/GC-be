import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { Auth } from '@/auth/auth.decorator';
import { Role } from '@/roles/roles.enum';
import { ContactUsService } from './contact-us.service';
import { ContactUsDto } from './contact-us.dto';
import { Response } from 'express';
import { handleErrorResponse } from '@/utils/handleErrorResponse';
import { Public } from '@/auth/public.decorator';

@Controller('contact-us')
export class ContactUsController {
  constructor(private contactUsService: ContactUsService) {}

  @Get('/')
  @Auth([Role.ADMIN])
  getContactUsRecords() {
    return this.contactUsService.getAll();
  }

  @Post('/')
  @Public()
  async createContactUs(
    @Body() contactUsDto: ContactUsDto,
    @Res() res: Response,
  ) {
    try {
      await this.contactUsService.create(contactUsDto);
      return res.json({ message: 'Your query has been submitted' });
    } catch (error: unknown) {
      return handleErrorResponse(error, res);
    }
  }
}
