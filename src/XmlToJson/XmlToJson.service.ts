import { Injectable } from '@nestjs/common';
import * as xml2js from 'xml2js';
@Injectable()
export class XmlToJsonService {
    convertXmlToJson(xml: string): any {
        let jsonObj = {};
        const xmlParser = new xml2js.Parser({
            explicitArray: false,
            mergeAttrs: true,
        });

        xmlParser.parseString(xml, (err, result) => {
            if (err) {
                throw new Error('Error converting XML to JSON');
            }
            jsonObj = this.recursiveParse(result);
        });

        return jsonObj;
    }

    private recursiveParse(obj: any): any {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }

        const result = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = this.recursiveParse(obj[key]);
            }
        }
        return result;
    }
}