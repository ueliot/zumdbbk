import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer  } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class FilesController {

  constructor(private readonly filesService: FilesService,
              private readonly configService: ConfigService
              ) {}

  //Uploda files-----------------------------//
  @Post('upload')
  @UseInterceptors(FileInterceptor('MyFile', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/sparepartimages',
      filename: fileNamer,
    })
    
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if(!file){
      throw new BadRequestException(`Make sure that the file is a image`);
    }
    //console.log({fileInController: file})
    const secureUrl = `${this.configService.get('HOST_API')}/files/sparepart/${file.filename}`;
    return {secureUrl};
  }
  //---------------------------------------------//

  //Return Images Name
  @Get('sparepart/:imageName')
  findSparepartImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ){
    const path = this.filesService.getStaticProductImage(imageName);
    // res.status(403).json({
    //   ok: false,
    //   path: path
    // })
    res.sendFile(path);
    //return path;
  }
  

  
}
