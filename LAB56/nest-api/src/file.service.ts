import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService<T> {
  constructor(private readonly filePath: string) {
    // filePath ожидается относительным к папке src
    this.filePath = path.resolve(__dirname, filePath);
  }

  read(): T {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as T;
  }

  write(data: T): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  add(item: any): void {
    const arr = this.read() as unknown as any[];
    arr.push(item);
    this.write(arr as unknown as T);
  }
}
