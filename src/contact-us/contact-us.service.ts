import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactUs } from './contact-us.entity';
import { ContactUsDto } from './contact-us.dto';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(ContactUs)
    private contactUsRepository: Repository<ContactUs>,
  ) {}

  getAll(): Promise<ContactUs[]> {
    return this.contactUsRepository.find();
  }

  create(contactUsDto: ContactUsDto): Promise<ContactUs> {
    const contactUs = new ContactUs();

    contactUs.email = contactUsDto.email;
    contactUs.name = contactUsDto.name;
    contactUs.message = contactUsDto.message;

    return this.contactUsRepository.save(contactUs);
  }
}
