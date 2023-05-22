/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Page } from 'src/page/page.entity';
import { UserGroup } from 'src/user-group/user-group.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.oneByUserName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    throw new HttpException('用户名密码错误', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async login(data: {
    id: string;
    username: string;
    userGroup: UserGroup;
    createTime: string;
    deleteTime: string;
    pages: Page[];
  }) {
    const { username, id } = data;
    const payload = {
      username,
      sub: id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      data,
      message: '登录成功',
    };
  }
}
