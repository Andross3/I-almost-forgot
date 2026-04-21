import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BirthdayPersonService {

  constructor(private prisma: PrismaService) { }

  async getAllBirthdayPeople() {
    return this.prisma.birthday_person.findMany()
  }
}
