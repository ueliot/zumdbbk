import { Module } from '@nestjs/common';
import { SparepartsService } from './spareparts.service';
import { SparepartsController } from './spareparts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sparepart, SparepartImage } from './entities';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [SparepartsController],
  providers: [SparepartsService],
  imports: [
    TypeOrmModule.forFeature([Sparepart, SparepartImage]),
    AuthModule
  ]
})
export class SparepartsModule {}
