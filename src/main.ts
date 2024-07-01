import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exceptions-filters/prisma.exception-filter';
import { CatchAllErrorsExceptionFilter } from './exceptions-filters/catch-all-errors.exception-filter';
import { InvalidRelationExceptionFilter } from './exceptions-filters/invalid-relation.exception-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(   
    new CatchAllErrorsExceptionFilter(httpAdapter),
    new PrismaExceptionFilter(),   
    new InvalidRelationExceptionFilter(), 
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422, //400
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
