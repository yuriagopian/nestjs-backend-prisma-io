import { PrismaService } from './../../database/PrismaService';
import { BookDTO } from './dto/book.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) { }

  async create(data: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (!bookExists) {
      const book = await this.prisma.book.create({
        data,
      });
      return book;
    }

    throw new Error('Book already exists');
  }
}
