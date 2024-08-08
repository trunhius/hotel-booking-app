import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/strategy/jwt.strategy";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [ConfigModule, JwtModule.register({})],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
})
export class UserModule { }