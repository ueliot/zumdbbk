import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Header, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeader } from './decorators/raw-header.decorator';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto);
    
  }

  @Get('private')
  @Auth(ValidRoles.user)
  testingPrivateRoute(    
    @GetUser() user: User,          
  ){    
    return {
      ok: true,
      msg: `Wellcome user: ${user.fullName}`,
      user: user,     
    }
  }


  @Get('private1')  
  @Auth( ValidRoles.admin, ValidRoles.superUser)
  privateRoute3(
    @GetUser() user: User,
    @RawHeader() rawHeader: string[],
  ){ 
    return{
        ok:true,
        msg: `Wellcome admin: ${user.fullName}`,
        user,
        rawHeader
      }
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(+id, updateUserDto);
  }


  @Get('check-status')
  @Auth(ValidRoles.user, ValidRoles.admin)
  checkAuthStatus(
    @GetUser() user: User
  ){
    return this.authService.checkAuthStatus(user);
  }


}
