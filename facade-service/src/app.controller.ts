import { Controller, Post, Get, Body, Logger } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  private logger = new Logger('AppController')
  constructor(private appService: AppService) {}

  @Post()
  async saveMessageData(@Body('msg') msg: string) {
    this.logger.log(`Saving data: ${msg}`)

    const uuid = this.appService.genUuid(msg)
    this.appService.save(msg)
    await this.appService.log({ uuid, msg })
  }

  @Get()
  async getMessageData() {
    const logData = await this.appService.getLogs()
    const msgServiceData = await this.appService.getMessages()

    this.logger.log(`Retrieved data: ${logData} ${msgServiceData}`)
    return `${logData}\n${msgServiceData}`
  }
}
