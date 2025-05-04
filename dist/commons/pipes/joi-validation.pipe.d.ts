import { PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';
export declare class JoiValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ObjectSchema);
    transform(value: Record<string, any>): Record<string, any>;
}
