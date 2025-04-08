// joi-validation.pipe.ts
import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { BaseError } from 'src/errors/base-error';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: Record<string, any>): Record<string, any> {
    const { error } = this.schema.validate(value, { abortEarly: false });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      throw new BaseError(errorMessage, errorMessage, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
