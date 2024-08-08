// import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
// import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { dangkyDTO } from './dto/dangky.dto';
import { dangnhapDTO } from './dto/dangnhap.dto';
import { googleDTO } from './dto/google.dto';

@ApiTags("QuanLyNguoiDung")

@Controller('api')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("/QuanLyNguoiDung/DangKy")
    async dangkyUser(@Body() dangkyDTO: dangkyDTO, @Res() res): Promise<any> {
        let data = await this.userService.dangkyUser(dangkyDTO)
        res.status(data.status).json(data)
    }

    @Post("/QuanLyNguoiDung/DangNhap")
    async dangNhapUser(@Body() dangnhapDTO: dangnhapDTO, @Res() res): Promise<any> {
        let data = await this.userService.dangNhapUser(dangnhapDTO)
        res.status(data.status).json(data)
    }

    @Post('/QuanLyNguoiDung/DangNhapGoogle')
    async dangNhapGoogle(@Body() googleDTO: googleDTO, @Res() res): Promise<any> {
        const data = await this.userService.validateOAuthLogin(googleDTO);
        res.status(data.status).json(data)
    }
}