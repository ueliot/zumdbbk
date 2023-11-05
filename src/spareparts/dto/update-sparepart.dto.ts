import { PartialType } from '@nestjs/mapped-types';
import { CreateSparepartDto } from './create-sparepart.dto';

export class UpdateSparepartDto extends PartialType(CreateSparepartDto) {}
