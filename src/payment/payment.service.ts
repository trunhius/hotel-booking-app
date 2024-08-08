import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { PAYMENT_CONFIG } from 'src/config/payment.config';
import { convertXmlToJson } from 'src/utils/xml-to-json.util';
import { PaymentDto } from './dto/payment.dto';
@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);

    async processPayment(confirmation_no: string, paymentDto: PaymentDto): Promise<string | { error: string }> {
        const filePath = path.resolve(__dirname, '..', '..', 'src', 'xml', `booking_${confirmation_no}.xml`);
        let amount: number;

        try {
            const xmlData = fs.readFileSync(filePath, 'utf8');
            const jsonData = await convertXmlToJson(xmlData);
            amount = 5555; // Demo, replace with real amount extraction
            paymentDto.amount = amount;

            const checksumString = [
                paymentDto.merchant_site_code,
                paymentDto.order_code,
                paymentDto.order_description || '',
                paymentDto.amount,
                paymentDto.currency,
                paymentDto.buyer_fullname,
                paymentDto.buyer_email,
                paymentDto.buyer_mobile,
                paymentDto.buyer_address,
                paymentDto.return_url,
                paymentDto.cancel_url,
                paymentDto.notify_url || '',
                paymentDto.language || '',
                PAYMENT_CONFIG.merchantPasscode
                // '123456789' // Merchant passcode
            ].join('|');

            paymentDto.checksum = crypto.createHash('md5').update(checksumString).digest('hex');

            const response = await axios.post(PAYMENT_CONFIG.endpoint, paymentDto);
            //const response = await axios.post('https://vietcombank.nganluong.vn/api/web/checkout/version_1_0/', paymentDto);

            if (response.data.result_code === '0000') {
                return response.data.result_data.checkout_url;
            } else {
                this.logger.error(`Payment failed: ${response.data.result_message}`);
                return { error: response.data.result_message };
            }
        } catch (error) {
            this.logger.error('Error processing payment:', error.message, error.stack);
            return { error: 'Error processing payment' };
        }
    }
}