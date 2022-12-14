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

  async list() {
    return await this.prisma.book.findMany()
  }

  async findById(id: string) {
    return await this.prisma.book.findUnique({
      where: {
        id: id,
      }
    })
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        id
      }
    })

    if (!bookExists) {
      throw new Error('Book does not exist');
    }

    return await this.prisma.book.update({
      data,
      where: {
        id
      }
    })
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        id
      }
    })

    if (!bookExists) {
      throw new Error('Book does not exist');
    }

    return await this.prisma.book.delete({
      where: {
        id
      }
    })
  }
}
