import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import * as fs from 'fs';
// import path from "path";
import { AuthGuard } from "@nestjs/passport";
import * as path from "path";
import { XmlToJsonService } from "./xmltojson.service";

@ApiTags("QuanLyXmlToJson")
@Controller('api')
export class XmlToJsonController {
    constructor(private readonly xmlToJsonService: XmlToJsonService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @ApiParam({ name: "confirmation_no", required: false, example: "173903", description: "confirmationNo" })
    @Get('/XmlToJson/:confirmation_no')
    async convertXmlToJson(@Param('confirmation_no') confirmation_no: string, @Res() res) {
        const filePath = path.resolve(__dirname, '..', '..', 'src', 'xml', `booking_${confirmation_no}.xml`);
        try {
            const xmlData = fs.readFileSync(filePath, 'utf8');
            const jsonData = await this.xmlToJsonService.convertXmlToJson(xmlData);
            return res.json(jsonData);
        } catch (error) {
            return res.status(500).json({ message: 'Error processing XML file', error: error.message });
        }
    }
}