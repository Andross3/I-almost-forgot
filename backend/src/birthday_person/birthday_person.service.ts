import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBirthdayDto } from './dto/create-birthday.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class BirthdayPersonService {
  constructor(private prisma: PrismaService) {}

  // obtener todos los cumpleaños
  async getAllBirthdayPeople() {
    try {
      const allBirthday = await this.prisma.birthday_person.findMany();
      return {
        message: 'Se obtuvieron todos los cumpleaños exitosamente',
        data: allBirthday,
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener todos los cumpleaños');
    }
  }

  // obtener un cumpleaños por id
  async getBirthdayPersonById(id: string) {
    return await this.findBirthdayOrFail(id);
  }

  // crear cumpleanos
  async createBirthdayPerson(data: CreateBirthdayDto) {
    try {
      const birthday = await this.prisma.birthday_person.create({
        data,
      });
      return {
        message: 'Cumpleaños creado exitosamente',
        data: birthday,
      };
    } catch (error) {
      throw new BadRequestException('Error al crear cumpleaños');
    }
  }

  // eliminar cumpleanos
  async deleteBirthdayPerson(id: string) {

    await this.findBirthdayOrFail(id)

    try {
      const birthday = await this.prisma.birthday_person.delete({
        where: { id },
      });
      return {
        message: 'Cumpleaños eliminado exitosamente',
        data: birthday,
      };
    } catch (error) {
      throw new BadRequestException('Error al eliminar cumpleaños');
    }
  }

  // editar cumpleanos
  async updateBirthdayPerson(id: string, data: any) {
    // buscar cumpleaños por id
    await this.findBirthdayOrFail(id)

    try {
      const birthday = await this.prisma.birthday_person.update({
        where: { id },
        data,
      });

      return {
        message: 'Cumpleaños actualizado exitosamente',
        data: birthday,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar cumpleaños')
    }
  }

  // buscar cumpleaños por id
  private async findBirthdayOrFail(id: string) {
    const birthday = await this.prisma.birthday_person.findUnique({
      where: { id },
    });

    if (!birthday) {
      throw new NotFoundException('Cumpleaños no encontrado');
    }

    return birthday;
  }
}
