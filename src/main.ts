import './instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'homebase',
      json: false,
      colors: true,
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Edubdrige Learning Management System API')
    .setDescription(
      'Edubdrige Learning Management System API is a RESTful API that provides a set of endpoints for managing users, courses, departments, units, academic years, cohorts, and more.',
    )
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`App is running on ${await app.getUrl()}`);
}
bootstrap();
