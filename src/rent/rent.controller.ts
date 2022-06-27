import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { ActualRentDto } from './dto/actual-rent.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { randomUUID } from 'crypto';
import { CoordRentDto } from './dto/coord-rent.dto';

@Controller('apartments')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName = `${name
            .split(' ')
            .join('_')}_${randomUUID()}.${fileExtension}`;
          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() dto: CreateRentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.rentService.create({ ...dto, urlImage: file?.filename });
  }

  @Get('pictures/:filename')
  async getPicture(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }

  @Get('/coord')
  getCoord(@Query() dto: CoordRentDto) {
    return this.rentService.coord(dto);
  }

  @Get()
  findAll() {
    return this.rentService.findAll();
  }

  @Get('/actual')
  getActual(@Query() dto: ActualRentDto) {
    return this.rentService.actual(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentService.findOne(id);
  }
}
