import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.model';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setupp swagger
  const config = new DocumentBuilder()
    .setTitle("hotel-booking-app")
    .setDescription("this is a list API hotel-booking-app")
    .addBearerAuth()
    .setVersion("1.0")
    .build()

  const swagger = SwaggerModule.createDocument(app, config)
  const swaggerAPI = SwaggerModule.setup("swagger", app, swagger)
  await app.listen(3000);
}
bootstrap();
