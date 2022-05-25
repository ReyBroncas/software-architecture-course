import { Injectable } from '@nestjs/common'
import { Client, IMap } from 'hazelcast-client'

@Injectable()
export class HazelService {
  private hz: Promise<Client>

  constructor() {
    this.hz = Client.newHazelcastClient({
      clusterName: 'hazel_intro',
      network: {
        clusterMembers: [`${process.env.HAZEL_NODE}:5701`],
      },
    })
  }

  private async getMap(): Promise<IMap<any, any>> {
    const client = await this.hz
    return await client.getMap('micro_hazelcast-map')
  }

  async put(key, value) {
    const map = await this.getMap()
    return await map.put(key, value)
  }

  async get(key) {
    const map = await this.getMap()
    return await map.get(key)
  }

  async values() {
    const map = await this.getMap()
    return await map.values()
  }
}
