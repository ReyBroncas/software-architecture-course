import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

import axios from 'axios'
import getUuid from 'uuid-by-string'
import _ from 'lodash'

@Injectable()
export class AppService {
  private LOGGING_SERVICES_LIST = process.env.LOGGING_SERVICES_LIST.split(' ')

  constructor(@Inject('rmq') private client: ClientProxy) {}

  private getRandomLoggingService(): string {
    return _.sample(this.LOGGING_SERVICES_LIST)
  }

  save(data: any) {
    this.client.emit('saveMessage', data)
  }

  async getMessages() {
    return await this.client.send('getMessages', {}).toPromise()
  }

  async log(data: any) {
    await axios.request({
      url: this.getRandomLoggingService(),
      method: 'post',
      data,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  async getLogs(): Promise<Array<string>> {
    const response = await axios.request({
      url: this.getRandomLoggingService(),
      method: 'get',
    })
    return response.data
  }

  genUuid(msg: string): string {
    return getUuid(msg)
  }
}
