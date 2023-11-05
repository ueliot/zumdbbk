import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SparepartImage } from "./";


@Entity({name: 'spareparts'})
export class Sparepart {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true,
    })
    article: string;

    @Column('numeric',{
        default:0,
    })
    stock: number;

    @Column({
        type: 'text',
        nullable: true,
    })
    family: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    subfamily1: string;

      @Column({
        type: 'text',
        nullable: true,
    })
    subfamily2: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    comments: string;

    @Column('text',{
        array: true,
        default: []
    })
    tags: string[];

    @OneToMany(
        ()=>SparepartImage,
        (sparepartImage)=>sparepartImage.sparepart,
        {cascade: true, eager: true}
    )  
    images?:  SparepartImage[];

    
    


    @BeforeInsert()
    checkArticletoCreate(){
        this.article=this.article
        .toLowerCase()
        .replaceAll(' ','.')        
    }


    @BeforeUpdate()
    checkArticletoUpdate(){
        this.article=this.article
        .toLowerCase()
        .replaceAll(' ','.')  
    }
    
}
