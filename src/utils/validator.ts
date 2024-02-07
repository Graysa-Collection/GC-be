import { BadRequestException } from '@nestjs/common';

export class Validator {
  constructor(private value: any) {}

  isString() {
    if (typeof this.value !== 'string') {
      throw new BadRequestException('not a string');
    }
    return this;
  }

  isEmail() {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(this.value)) {
      throw new BadRequestException('not a valid email address');
    }
    return this;
  }

  isNotEmpty() {
    if (!this.value || this.value === '') {
      throw new BadRequestException('empty');
    }
    return this;
  }

  isNumber() {
    if (typeof this.value !== 'number') {
      throw new BadRequestException('not a number');
    }
    return this;
  }

  isNotNegative() {
    if (this.value < 0) {
      throw new BadRequestException('not positive');
    }
    return this;
  }

  isStrongPassword() {
    const strongPasswordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$_%^&-*-/+=.,]).{8,}$/;

    if (!strongPasswordRegex.test(this.value)) {
      throw new BadRequestException('not a strong password');
    }
    return this;
  }
}

export function validate(value: any) {
  return new Validator(value);
}
