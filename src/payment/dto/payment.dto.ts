import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentDto {
    @ApiProperty({
        description: 'The function name, always "CreateOrder".',
        example: 'CreateOrder',
    })
    @IsString()
    @IsNotEmpty()
    function: string;

    @ApiProperty({
        description: 'The merchant site code provided by the payment gateway.',
        example: '7',
    })
    @IsString()
    @IsNotEmpty()
    merchant_site_code: string;

    @ApiProperty({
        description: 'Unique order code for the payment request.',
        example: 'ORDER531340616',
    })
    @IsString()
    @IsNotEmpty()
    order_code: string;

    @ApiProperty({
        description: 'Description of the order.',
        example: 'Thanh toán cho đơn hàng 531340616',
        required: false,
    })
    @IsString()
    @IsOptional()
    order_description?: string;

    @ApiProperty({
        description: 'The total amount for the order in VND.',
        example: 9831780,
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({
        description: 'Currency of the payment amount.',
        example: 'VND',
    })
    @IsString()
    @IsNotEmpty()
    currency: string;

    @ApiProperty({
        description: 'Full name of the buyer.',
        example: 'Nguyen Van A',
    })
    @IsString()
    @IsNotEmpty()
    buyer_fullname: string;

    @ApiProperty({
        description: 'Email address of the buyer.',
        example: 'vcb-test@yopmail.com',
    })
    @IsString()
    @IsNotEmpty()
    buyer_email: string;

    @ApiProperty({
        description: 'Mobile phone number of the buyer.',
        example: '0123456789',
    })
    @IsString()
    @IsNotEmpty()
    buyer_mobile: string;

    @ApiProperty({
        description: 'Address of the buyer.',
        example: '123 Đường ABC, TP. HCM',
    })
    @IsString()
    @IsNotEmpty()
    buyer_address: string;

    @ApiProperty({
        description: 'URL to redirect to after a successful payment.',
        example: 'http://localhost:3000/payment-success',
    })
    @IsString()
    @IsNotEmpty()
    return_url: string;

    @ApiProperty({
        description: 'URL to redirect to if the payment is canceled.',
        example: 'http://localhost:3000/payment-fail',
    })
    @IsString()
    @IsNotEmpty()
    cancel_url: string;

    @ApiProperty({
        description: 'URL to receive notifications about the payment status.',
        example: 'http://localhost:3000/payment-notify',
        required: false,
    })
    @IsString()
    @IsOptional()
    notify_url?: string;

    @ApiProperty({
        description: 'Language for the payment page display.',
        example: 'vi',
    })
    @IsString()
    @IsNotEmpty()
    language: string;

    @ApiProperty({
        description: 'API version for the payment gateway.',
        example: '1.0',
    })
    @IsString()
    @IsNotEmpty()
    version: string;

    @ApiProperty({
        description: 'Payment method code (e.g., IB-ONLINE for Internet Banking).',
        example: 'IB-ONLINE',
    })
    @IsString()
    @IsNotEmpty()
    payment_method_code: string;

    @ApiProperty({
        description: 'Bank code used for QR code payment (if applicable).',
        example: '',
        required: false,
    })
    @IsString()
    @IsOptional()
    bank_code?: string;

    @ApiProperty({
        description: 'Checksum for verifying the integrity of the request.',
        example: '',
    })
    @IsString()
    @IsNotEmpty()
    checksum: string;
}