import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  private storage = []

  addMessage(data: string) {
    this.storage.push(data)
  }

  getMessages() {
    return this.storage.toString()
  }
}
