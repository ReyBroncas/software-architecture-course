import { Injectable } from '@nestjs/common'
import { HazelService } from './hazel/hazel.service'

@Injectable()
export class AppService {
  private cache = new HazelService()

  async logData({ uuid, msg }) {
    await this.cache.put(uuid, msg)
  }

  async loadLogs(): Promise<any> {
    return await this.cache.values()
  }
}
