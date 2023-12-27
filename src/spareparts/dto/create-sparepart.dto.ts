import { IsArray, IsIn, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateSparepartDto {

    @IsString()
    @MinLength(2)
    article: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsIn(['usys','sparker','kw','odac','msd','capac',
    'odex','stellmaster','profilmaster','pmm','umac','rayex'
    ])
    family: string;

    @IsString()
    @IsOptional()
    subfamily1: string;

    @IsString()
    @IsOptional()
    subfamily2: string;

    @IsString()
    @IsOptional()
    loc: string;

    @IsString()
    @IsOptional()
    comments: string;


    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

}
