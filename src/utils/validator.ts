import { BadRequestException } from '@nestjs/common';

export class Validator {
  constructor(private value: any) {}

  isString() {
    if (typeof this.value !== 'string') {
      throw new BadRequestException('not a string');
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
}

export function validate(value: any) {
  return new Validator(value);
}
