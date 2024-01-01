import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
@Injectable()
export class CatsService {
  cats: Array<any> = [];
  constructor() {
    this.cats = [];
  }

  run() {
    return 'The cat is running';
  }

  findOne(id: number) {
    return id;
  }

  create(cart: CreateCatDto) {
    this.cats.push(cart);
  }
}
