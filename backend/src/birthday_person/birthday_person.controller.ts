import { Controller, Get } from '@nestjs/common';
import { BirthdayPersonService } from './birthday_person.service';

@Controller('birthday-person')
export class BirthdayPersonController {
  constructor(private birthdayPersonService: BirthdayPersonService){}

  @Get('/sofia')
  async findAll() {
    return this.birthdayPersonService.getAllBirthdayPeople();
  }
}
