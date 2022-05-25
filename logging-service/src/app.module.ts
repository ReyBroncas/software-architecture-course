import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HazelService } from './hazel/hazel.service';
import { HazelModule } from './hazel/hazel.module';

@Module({
  imports: [HazelModule],
  controllers: [AppController],
  providers: [AppService, HazelService],
})
export class AppModule {}
