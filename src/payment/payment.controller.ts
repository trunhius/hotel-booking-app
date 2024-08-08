import { Body, Controller, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';
@ApiTags("QuanLyPayment")
@Controller('api')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService,) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @ApiParam({ name: "confirmation_no", required: false, example: "173903" })
    @Post('/payment/:confirmation_no')
    async pay(@Body() paymentDto: PaymentDto, @Param('confirmation_no') confirmation_no: string, @Req() req, @Res() res: Response) {

        const result = await this.paymentService.processPayment(confirmation_no, paymentDto);

        if (typeof result === 'string') {
            if (!res.headersSent) {
                res.redirect(result);
            }
        } else if (result.error) {
            console.error('Error processing payment:', result.error);
            if (!res.headersSent) {
                res.status(400).json({ message: result.error });
            }
        }
    }
}