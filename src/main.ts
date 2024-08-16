import { AppModule } from '@app/app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentVariables } from '@utils/config/config';
import { sApiKeyBearer, sJwtBearer } from '@utils/header';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  app.useGlobalPipes(new ValidationPipe());
  const logger = new Logger('NestBootstrap');

  const options = new DocumentBuilder()
    .setTitle('Updated API')
    .setDescription('An updated API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      sJwtBearer,
    )
    .addApiKey(
      {
        type: 'apiKey',
        scheme: 'apiKey',
        bearerFormat: 'apiKey',
        name: sApiKeyBearer,
        description: 'Enter API key',
        in: 'header',
      },
      sApiKeyBearer,
    )
    .build();

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.enableCors();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`docs`, app, document);

  const configService = app.get(ConfigService<EnvironmentVariables>);
  const PORT = configService.get('PORT', { infer: true });

  await app.listen(PORT, '0.0.0.0');
  logger.log(`Listening on port ${PORT}`);
}
bootstrap();
