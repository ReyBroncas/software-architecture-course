import { Controller, Logger } from '@nestjs/common'
import { EventPattern, MessagePattern } from '@nestjs/microservices'
import { AppService } from './app.service'

@Controller()
export class AppController {
  private logger = new Logger('AppController')
  constructor(private appService: AppService) {}

  @EventPattern('saveMessage')
  addMessage(data: string) {
    this.logger.log(`Saved msg: ${data}`)
    this.appService.addMessage(data)
  }

  @MessagePattern('getMessages')
  getMessages() {
    this.logger.log(`Loaded messages: ${this.appService.getMessages()}`)
    return `Messages in storage: ${this.appService.getMessages()}`
  }
}
