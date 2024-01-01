import { Module } from '@nestjs/common';
import { Cats } from './cats';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
  providers: [Cats, CatsService],
  controllers: [CatsController],
  exports: [CatsService],
})
export class CatsModule {}
