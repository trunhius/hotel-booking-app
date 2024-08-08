import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModel } from './payment/payment.model';
import { UserModule } from './user/user.model';
import { XmlToJsonModel } from './XmlToJson/XmlToJson.model';

@Module({
    imports: [
        UserModule, XmlToJsonModel, PaymentModel,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }