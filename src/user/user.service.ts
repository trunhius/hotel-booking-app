import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { dangkyDTO } from './dto/dangky.dto';
import { dangnhapDTO } from './dto/dangnhap.dto';
import { googleDTO } from './dto/google.dto';

@Injectable()
export class UserService {
    constructor(private JwtService: JwtService, private ConfigService: ConfigService) { }

    prisma = new PrismaClient()

    async dangkyUser(dangkyDTO: dangkyDTO): Promise<any> {
        try {
            let { email, pass_word } = dangkyDTO;

            // Kiểm tra dữ liệu đầu vào
            if (!email || !pass_word) {
                return {
                    status: 400,
                    message: "Vui lòng nhập đầy đủ thông tin!",
                };
            }
            let user = await this.prisma.users.findFirst({
                where: {
                    email
                }
            });
            if (user) {
                return {
                    status: 401,
                    message: "Tài khoản đã tồn tại!",
                };
            } else {
                try {
                    let newPass = bcrypt.hashSync(pass_word, 10); // Mã hoá password
                    let newUser = {
                        email,
                        pass_word: newPass,
                    };
                    await this.prisma.users.create({
                        data: newUser
                    });
                    return {
                        status: 201,
                        message: "Tạo tài khoản thành công!",
                    };
                } catch (bcryptError) {
                    return {
                        status: 500,
                        message: "Lỗi khi mã hoá mật khẩu: " + bcryptError.message,
                    };
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async dangNhapUser(dangnhapDTO: dangnhapDTO): Promise<any> {
        try {
            let { email, pass_word } = dangnhapDTO;
            // check email co ton tại trong database
            let checkUser = await this.prisma.users.findFirst({
                where: {
                    email
                }
            })
            if (checkUser) {
                // isCorrectPass
                let isCorrectPass = bcrypt.compareSync(pass_word, checkUser.pass_word)
                if (isCorrectPass) {
                    let payload = {
                        email: checkUser.email,
                    }
                    let token = this.JwtService.sign(payload, { secret: this.ConfigService.get("SECRET_KEY"), expiresIn: this.ConfigService.get("EXPIRES_IN") })
                    return {
                        status: 200,
                        token: token
                    }
                }
                return {
                    status: 400,
                    message: "Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.",
                };
            }
            return {
                status: 404,
                message: "Người dùng không tồn tại.",
            };
        } catch (error) {
            return {
                status: 500,
                message: "Lỗi xử lý: " + error.message,
            };
        }
    }

    async validateOAuthLogin(googleDTO: googleDTO): Promise<any> {
        try {
            const { email } = googleDTO;
            const user = await this.prisma.users.findFirst({ where: { email } });
            if (!user) {
                await this.prisma.users.create({
                    data: {
                        email,
                        pass_word: '',
                    },
                });
            }
            const payload = { email };
            const token = this.JwtService.sign(payload, { secret: this.ConfigService.get("SECRET_KEY"), expiresIn: this.ConfigService.get("EXPIRES_IN") });
            return {
                status: 200,
                token: token
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Lỗi xử lý: ' + error.message,
            };
        }
    }

}