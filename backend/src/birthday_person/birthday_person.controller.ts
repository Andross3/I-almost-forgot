import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BirthdayPersonService } from './birthday_person.service';
import { CreateBirthdayDto } from './dto/create-birthday.dto';

@Controller('/birthday-person')
export class BirthdayPersonController {
  constructor(private birthdayPersonService: BirthdayPersonService){}

  @Get('/birthdays')
  async findAll() {
    return this.birthdayPersonService.getAllBirthdayPeople();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.birthdayPersonService.getBirthdayPersonById(id);
  }

  @Post('/create-birthday')
  async createBirthday(@Body() data: CreateBirthdayDto) {
    return this.birthdayPersonService.createBirthdayPerson(data);
  }

  @Put(':id')
  async updateBirthday(@Param('id') id: string, @Body() data:any) {
    return this.birthdayPersonService.updateBirthdayPerson(id, data);
  }

  @Delete(':id')
  async deleteBirthday(@Param('id') id: string) {
    return this.birthdayPersonService.deleteBirthdayPerson(id);
  }
}
