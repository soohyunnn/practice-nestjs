import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Header,
  Redirect,
  BadRequestException,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {VerifyEmailDto} from "./dto/verify-email.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import {UserInfo} from "./interface/user-login-interface";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    console.log(dto);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    console.log(dto);
    return;
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    console.log(dto);
    return;
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    console.log(userId);
    return;
  }


  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   const { name, email } = createUserDto;
  //
  //   return `유저를 생성했습니다. 이름: ${name}, 이메일: ${email}`;
  //   // return this.usersService.create(createUserDto);
  // }
  //
  // @Get()
  // findAll(@Res() res) {
  //   const users = this.usersService.findAll();
  //   return res.status(200).send(users);
  // }
  // @Header('Custom', 'Test Header')
  // @Redirect('https://nestjs.com', 301)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   if (+id < 1) {
  //     throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
  //   }
  //
  //   return this.usersService.findOne(+id);
  // }
  //
  // @HttpCode(202)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
  //
  // @Get('redirect/docs')
  // @Redirect('https://docs.nestjs.com', 302)
  // getDocs(@Query('version') version) {
  //   if (version && version === '5') {
  //     return { url: 'https://docs.nestjs.com/v5/' };
  //   }
  // }
  //
  // @Delete(':userId/memo/:memoId')
  // deleteUserMemo(
  //   @Param('userId') userId: string,
  //   @Param('memoId') memoId: string,
  // ) {
  //   return `userId: ${userId}, memoId: ${memoId}`;
  // }
}
