import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SparepartImage } from "./";
import { User } from "src/auth/entities/user.entity";


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
    loc: string;

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

    
    
    @ManyToOne(
        ()=> User,
        (user)=> user.sparepart,
        {eager: true}

    )
    user: User;


    @BeforeInsert()
    checkArticletoCreate(){
        this.article=this.article
        .toUpperCase()
        .replaceAll(' ','.')        
    }


    @BeforeUpdate()
    checkArticletoUpdate(){
        this.article=this.article
        .toUpperCase()
        .replaceAll(' ','.')  
    }
    
}
