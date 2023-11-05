import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { SparepartsService } from './spareparts.service';
import { CreateSparepartDto } from './dto/create-sparepart.dto';
import { UpdateSparepartDto } from './dto/update-sparepart.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('spareparts')
export class SparepartsController {
  constructor(private readonly sparepartService: SparepartsService) {}

  @Post()
  create(@Body() createSparepartDto: CreateSparepartDto) {
    return this.sparepartService.create(createSparepartDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    //console.log(paginationDto);
    return this.sparepartService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('term') term: string) {
    return this.sparepartService.findOnePlain(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateSparepartDto: UpdateSparepartDto) {
    return this.sparepartService.update(id, updateSparepartDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.sparepartService.remove(id);
  }
}
