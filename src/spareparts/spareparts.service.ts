import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateSparepartDto } from './dto/create-sparepart.dto';
import { UpdateSparepartDto } from './dto/update-sparepart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Sparepart, SparepartImage } from './entities';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {validate as isUUID} from 'uuid';
import { error } from 'console';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SparepartsService {

  private readonly logger = new Logger('SparepartService')


  //-----------------------------------------------------------//
  constructor(
    @InjectRepository(Sparepart)
    private readonly sparepartRepository: Repository<Sparepart>,
    @InjectRepository(SparepartImage)
    private readonly sparepartImageRepository: Repository<SparepartImage>,
    //Inject Datasource
    private readonly dataSource: DataSource,
  ) {}



  //---------------------------------------------------------//
  async create(createSparepartDto: CreateSparepartDto, user: User) {

    const {images=[], ...spareDetail} = createSparepartDto
    
    try {
      const sparepart = this.sparepartRepository.create({
        ...spareDetail,
        user,
        images: images.map( image => this.sparepartImageRepository.create({url: image}) )
      });
      await this.sparepartRepository.save(sparepart);
      return {...sparepart, images: images};

    } catch(error){
      this.handleExceptions(error);
    }

    
  }

  //---------------------------------------------------------//
  async findAll(paginationDto: PaginationDto) {
    const { limit=10, offset=0} = paginationDto;    
    const spareparts: Sparepart[] = await this.sparepartRepository.find({
      take: limit,
      skip: offset,     
    });    
    return spareparts.map( spare => ({
      ...spare,
      images: spare.images.map( img =>img.url)
    }));
  }
//--------------------------------------------------------//
  async findOne(term: string) {     
    let sparepart: Sparepart;
    if(isUUID(term)){
      sparepart = await this.sparepartRepository.findOneBy({id: term});
    }else{
      sparepart = await this.sparepartRepository.findOneBy({article: term});
    }
    const {images, ...spareDetail} = sparepart
    //console.log (sparepart);
    if (!sparepart)
      throw new NotFoundException(`Not Found this id: ${term}`);
    return sparepart;    
  }

  //---------------------------------------------------------//
  async findOnePlain(term: string){
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map(image => image.url)
    }
  }
  //--------------------------------------------------------//
  async update(id: string, updateSparepartDto: UpdateSparepartDto, user: User) {
    const {images, ...toUpdate} = updateSparepartDto;
    const sparepart = await this.sparepartRepository.preload({id, ...toUpdate});
    if (!sparepart) throw new NotFoundException(`Product whit id: ${id} not found`);
    //CREATE QueryRunner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      if (images){
        await queryRunner.manager.delete( SparepartImage, {sparepart: { id: id}})
        sparepart.images = images.map(
          image => this.sparepartImageRepository.create({url: image})
          )
        } else {
          //sparepart.images??
        }
      sparepart.user = user;
      await queryRunner.manager.save(sparepart);
      await queryRunner.commitTransaction();
      await queryRunner.release();
       
      return this.findOnePlain(id);
    }catch(error){
      await queryRunner.rollbackTransaction();
      await queryRunner.release()
      this.handleExceptions(error);
    }    
  }

  //-------------------------------------------------------//
  async remove(id: string) {
    const sparepart = await this.findOne(id);
    try{
      this.sparepartRepository.remove(sparepart);
    }catch(error){
      this.handleExceptions(error);
    }
  }



  //-----------------------------------------------------//
  //Method to drive errors
  private handleExceptions(error:any){

    if(error.code ==='23505')
      throw new BadRequestException(error.detail)
      this.logger.error(error)
      //console.log(error)
      throw new InternalServerErrorException('Unexpected error, check server logs');
 
  }


}
