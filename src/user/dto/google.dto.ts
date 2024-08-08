import { ApiProperty } from "@nestjs/swagger"
import { IsEmail } from "class-validator"

export class googleDTO {
    @ApiProperty({ type: String, description: "email", example: "trunghieu@gmail.com" })
    @IsEmail()
    email: string
}