import { Global, Module } from '@nestjs/common'
import { HazelService } from './hazel.service'

@Global()
@Module({
  providers: [HazelService],
  exports: [HazelService],
})
export class HazelModule {}
