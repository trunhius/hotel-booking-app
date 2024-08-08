import { Injectable } from '@nestjs/common';
import * as xml2js from 'xml2js';
@Injectable()
export class XmlToJsonService {
    // async transformXmlToJson(xml: string): Promise<any> {
    //     try {
    //         const result = await parseStringPromise(xml, {
    //             explicitArray: false, // To avoid wrapping elements in arrays
    //             mergeAttrs: true, // Merge attributes with element values
    //         });
    //         return result;
    //     } catch (error) {
    //         throw new Error('Error parsing XML: ' + error.message);
    //     }
    // }
    // async transformXmlToJson(xml: string): Promise<any> {
    //     return await convertXmlToJson(xml);
    // }
    convertXmlToJson(xml: string): any {
        let jsonObj = {};
        const xmlParser = new xml2js.Parser({
            explicitArray: false, // Disable explicit array for simple elements
            mergeAttrs: true,     // Merge attributes into tag elements
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