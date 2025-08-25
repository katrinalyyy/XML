import { Controller, Get, Post, Head, Body, Patch, Param, Delete, Query, Res,HttpCode } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { Response } from 'express';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Head()
  @HttpCode(200)
  headAll(@Res({ passthrough: true }) res: Response) {
    const count = this.stocksService.count();
    res.setHeader('X-Total-Count', count);
  }

  @Head(':id')
  @HttpCode(200)
  headOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.stocksService.assertExists(+id);
    res.setHeader('X-Stock-Exists', 'true');
  }
  
  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll(@Query('title') title?: string): Stock[] {
    return this.stocksService.findAll(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
  //   return this.stocksService.update(+id, updateStockDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.stocksService.remove(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStockDto,): Stock {
    return this.stocksService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.stocksService.remove(+id);
  }


}
