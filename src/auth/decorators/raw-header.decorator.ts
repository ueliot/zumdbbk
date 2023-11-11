import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const RawHeader = createParamDecorator(
    
    (data:string, ctx: ExecutionContext)=>{
        const req = ctx.switchToHttp().getRequest();
        //console.log(req);
        return req.rawHeaders;

    }
)