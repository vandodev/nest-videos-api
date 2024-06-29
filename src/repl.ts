import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await repl(AppModule);
}

bootstrap();

//get(CategoriesService).findAll()
//get(AppService).getHello()
//npm run repl
//debug()