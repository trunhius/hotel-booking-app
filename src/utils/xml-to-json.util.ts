import { parseStringPromise } from 'xml2js';

export async function convertXmlToJson(xml: string): Promise<any> {
    try {
        const result = await parseStringPromise(xml, {
            explicitArray: false, // To avoid wrapping elements in arrays
            mergeAttrs: true, // Merge attributes with element values
        });
        return result;
    } catch (error) {
        throw new Error('Error parsing XML: ' + error.message);
    }
}