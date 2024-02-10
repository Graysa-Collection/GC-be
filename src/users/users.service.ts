import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '@/roles/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async createUser(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    user.role = Role.CUSTOMER;

    return this.userRepository.save(user);
  }
}
