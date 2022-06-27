import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RentModule } from './rent/rent.module';
import { RentEntity } from './rent/entities/rent.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysql',
      database: 'rent-map',
      entities: [RentEntity],
      synchronize: true,
    }),
    RentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
