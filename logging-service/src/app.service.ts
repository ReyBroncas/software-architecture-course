import { Injectable } from '@nestjs/common'
import { HazelService } from './hazel/hazel.service'

@Injectable()
export class AppService {
  private cache = new HazelService()

  async saveData({ uuid, msg }) {
    await this.cache.put(uuid, msg)
  }

  async loadData(): Promise<string> {
    return Array.from(await this.cache.values()).join(',')
  }
}
