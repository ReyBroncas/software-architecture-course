import { Injectable } from '@nestjs/common'

import axios from 'axios'
import getUuid from 'uuid-by-string'

@Injectable()
export class AppService {
  private LOGGING_SERVICE_BASE_URI = 'http://localhost:3001'
  private MESSAGE_SERVICE_BASE_URI = 'http://localhost:3002'

  async logData(data: any) {
    await axios.request({
      url: `${this.LOGGING_SERVICE_BASE_URI}/`,
      method: 'post',
      data,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  async retrieveLogData(): Promise<Array<string>> {
    const response = await axios.request({
      url: `${this.LOGGING_SERVICE_BASE_URI}/`,
      method: 'get',
    })
    return response.data
  }

  async reqMessageService() {
    const response = await axios.request({
      url: `${this.MESSAGE_SERVICE_BASE_URI}`,
      method: 'get',
    })
    return response.data
  }

  genUuid(msg: string): string {
    return getUuid(msg)
  }
}
