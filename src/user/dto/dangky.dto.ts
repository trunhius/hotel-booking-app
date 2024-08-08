import { ApiProperty } from "@nestjs/swagger"

export class dangkyDTO {

    @ApiProperty({ type: String, description: "email", example: "trunghieu01@gmail.com" })
    email: string

    @ApiProperty({ type: String, description: "pass_word", example: "555" })
    pass_word: string
}