import { UsersService } from '@/users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './sign-up.dto';
import { User } from '@/users/user.entity';
import { validate } from '@/utils/validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<string> {
    this.validateLogin(signInDto.email, signInDto.password);

    const user = await this.usersService.findOneByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await this.compareHash(signInDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAccessToken(user);
  }

  async signUp(signUpDto: SignUpDto): Promise<string> {
    this.validateSignUp(signUpDto.email, signUpDto.password);

    const user = await this.usersService.findOneByEmail(signUpDto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashPassword(signUpDto.password);
    const createdUser = await this.usersService.createUser(
      signUpDto.email,
      hashedPassword,
    );

    return this.generateAccessToken(createdUser);
  }

  private hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  private compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  private validateLogin(email: string, password: string): void {
    try {
      validate(email).isNotEmpty();
    } catch (error: any) {
      throw new UnauthorizedException('Invalid credentials');
    }
    try {
      validate(password).isNotEmpty();
    } catch (error: any) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private validateSignUp(email: string, password: string): void {
    try {
      validate(email).isString().isNotEmpty().isEmail();
    } catch (error: any) {
      throw new BadRequestException(`Email is ${error.message}`);
    }
    try {
      validate(password).isNotEmpty().isStrongPassword();
    } catch (error: any) {
      throw new BadRequestException(`Password is ${error.message}`);
    }
  }
}
