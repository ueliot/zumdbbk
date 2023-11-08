import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';


@Injectable()
export class FilesService {

    getStaticProductImage(imageName:string){
        const path = join(__dirname, '../../static/sparepartimages', imageName)
        if(!existsSync(path)) throw new BadRequestException(`Image not found: ${imageName}`)
        return path;
    } 

}
