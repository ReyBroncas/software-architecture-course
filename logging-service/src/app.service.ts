import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  private cache = new Map<string, string>()

  saveData({ uuid, msg }) {
    this.cache.set(uuid, msg)
  }

  loadData(): string {
    return Array.from(this.cache.values()).join(',')
  }
}
