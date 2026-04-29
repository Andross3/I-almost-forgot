import { Module } from '@nestjs/common';
import { BirthdayPersonService } from './birthday_person.service';
import { BirthdayPersonController } from './birthday_person.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BirthdayPersonController],
  providers: [BirthdayPersonService],
  imports: [PrismaModule]
})
export class BirthdayPersonModule {}
