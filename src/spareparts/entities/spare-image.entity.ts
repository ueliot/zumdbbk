import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sparepart } from ".";

@Entity()
export class SparepartImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;


    @ManyToOne(
        ()=>Sparepart,
        (sparepart)=>sparepart.images,
        { onDelete: 'CASCADE'}
    )
    sparepart: Sparepart;

    

}