import { BookDTO } from './dto/book.dto';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data);
  }

  @Get()
  async list() {
    return this.bookService.list()
  }

  @Get(':id')
  async find(@Param('id') id) {
    return this.bookService.findById(id);
  }

}
