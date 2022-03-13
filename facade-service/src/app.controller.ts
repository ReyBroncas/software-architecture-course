import { Controller, Post, Get, Body } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async saveMessageData(@Body('msg') msg: string) {
    const uuid = this.appService.genUuid(msg)
    await this.appService.logData({ uuid, msg })
  }

  @Get()
  async getMessageData() {
    const logData = await this.appService.retrieveLogData()
    const msgServiceData = await this.appService.reqMessageService()
    return `${logData}${msgServiceData}`
  }
}
