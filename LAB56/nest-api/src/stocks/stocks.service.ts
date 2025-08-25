import { Injectable, NotFoundException  } from '@nestjs/common';

import { FileService } from '../file.service';
import { Stock } from './entities/stock.entity';

import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StocksService {
  constructor(private readonly fileService: FileService<Stock[]>) {}

  count(): number {
    return this.fileService.read().length;
  }

  assertExists(id: number): void {
    if (!this.fileService.read().some(s => s.id === id)) {
      throw new NotFoundException(`Stock #${id} not found`);
    }
  }

  findAll(title?: string): Stock[] {
    const stocks = this.fileService.read();
    if (title) {
      const q = title.toLowerCase();
      return stocks.filter(s => s.title.toLowerCase().includes(q));
    }
    return stocks;
  }

  findOne(id: number): Stock {
    const stock = this.fileService.read().find(s => s.id === id);
    if (!stock) {
      throw new NotFoundException(`Stock with id=${id} not found`);
    }
    return stock;
  }

  create(dto: CreateStockDto): Stock {
    const stocks = this.fileService.read();
    const newId = stocks.length ? Math.max(...stocks.map(s => s.id)) + 1 : 1;
    const newStock: Stock = { id: newId, ...dto };
    this.fileService.add(newStock);
    return newStock;
  }

  update(id: number, dto: UpdateStockDto): Stock {
    const stocks = this.fileService.read();
    let updated: Stock | null = null; 
    const result = stocks.map(s => {
      if (s.id === id) {
        updated = { ...s, ...dto };
        return updated;
      }
      return s;
    });

    if (!updated) {
      throw new NotFoundException(`Stock with id=${id} not found`);
    }

    this.fileService.write(result);
    return updated;
  }
  
  remove(id: number): void {
    const stocks = this.fileService.read();
    const exists = stocks.some(s => s.id === id);
    if (!exists) {
      throw new NotFoundException(`Stock with id=${id} not found`);
    }
    const filtered = stocks.filter(s => s.id !== id);
    this.fileService.write(filtered);
  }

}
