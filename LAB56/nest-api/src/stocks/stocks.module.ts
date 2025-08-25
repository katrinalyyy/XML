import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { FileService } from '../file.service';
import { Stock } from './entities/stock.entity';

@Module({
  imports: [],
  controllers: [StocksController],
  providers: [
    StocksService,
    {
      provide: FileService,
      useFactory: () => new FileService<Stock[]>('assets/stocks.json'),
    },
  ],
  exports: [FileService],
})
export class StocksModule {}
