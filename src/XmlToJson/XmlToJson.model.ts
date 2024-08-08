import { Module } from '@nestjs/common';
import { XmlToJsonController } from './XmlToJson.controller';
import { XmlToJsonService } from './XmlToJson.service';

@Module({
    controllers: [XmlToJsonController],
    providers: [XmlToJsonService],
})
export class XmlToJsonModel { }