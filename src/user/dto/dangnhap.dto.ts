import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class dangnhapDTO {
    @ApiProperty({ type: String, description: "email", example: "trunghieu@gmail.com" })
    @IsEmail()
    email: string

    @ApiProperty({ type: String, description: "pass_word", example: "555" })
    @IsNotEmpty()
    pass_word: string
}