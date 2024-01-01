import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

// 自定义管道
@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException('validation failed');
    }

    return value;
  }
}
