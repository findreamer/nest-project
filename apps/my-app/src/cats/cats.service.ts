import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  run() {
    return 'The cat is running';
  }
}
