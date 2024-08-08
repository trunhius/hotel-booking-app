import { Module } from '@nestjs/common';
import { XmlToJsonController } from './xmltojson.controller';
import { XmlToJsonService } from './xmltojson.service';

@Module({
    controllers: [XmlToJsonController],
    providers: [XmlToJsonService],
})
export class XmlToJsonModel { }