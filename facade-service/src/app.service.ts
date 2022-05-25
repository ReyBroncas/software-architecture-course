import { Injectable } from '@nestjs/common'

import axios from 'axios'
import getUuid from 'uuid-by-string'
import _ from 'lodash'

@Injectable()
export class AppService {
  private MESSAGE_SERVICE_BASE_URI = 'http://message-service:3002'
  private LOGGING_SERVICE_BASE_URI = [
    'http://logging-service-1:3001',
    'http://logging-service-2:3001',
    'http://logging-service-3:3001',
  ]

  private getRandomLogger(): string {
    const tmp = _.sample(this.LOGGING_SERVICE_BASE_URI)
    return tmp
  }

  async logData(data: any) {
    await axios.request({
      url: this.getRandomLogger(),
      method: 'post',
      data,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  async retrieveLogData(): Promise<Array<string>> {
    const response = await axios.request({
      url: this.getRandomLogger(),
      method: 'get',
    })
    return response.data
  }

  async reqMessageService() {
    const response = await axios.request({
      url: this.MESSAGE_SERVICE_BASE_URI,
      method: 'get',
    })
    return response.data
  }

  genUuid(msg: string): string {
    return getUuid(msg)
  }
}
