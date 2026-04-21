import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BirthdayPersonModule } from './birthday_person/birthday_person.module';

@Module({
  imports: [ConfigModule.forRoot(), BirthdayPersonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
