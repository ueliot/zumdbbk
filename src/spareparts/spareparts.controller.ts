import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { SparepartsService } from './spareparts.service';
import { CreateSparepartDto } from './dto/create-sparepart.dto';
import { UpdateSparepartDto } from './dto/update-sparepart.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('spareparts')
export class SparepartsController {
  constructor(private readonly sparepartService: SparepartsService) {}

  @Post()
  @Auth( ValidRoles.admin)
  create(@Body() createSparepartDto: CreateSparepartDto,
         @GetUser() user: User,) {
    return this.sparepartService.create(createSparepartDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    //console.log(paginationDto);
    return this.sparepartService.findAll(paginationDto);
  }

  @Get('find/:term')
  findfind(@Query() paginationDto: PaginationDto, @Param('term') term: string) {
    //console.log(paginationDto);
    return this.sparepartService.findfind(paginationDto, term);
  }


  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.sparepartService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth( ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateSparepartDto: UpdateSparepartDto,
    @GetUser() user: User) {
    return this.sparepartService.update(id, updateSparepartDto, user);
  }

  @Delete(':id')
  @Auth( ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.sparepartService.remove(id);
  }
}
