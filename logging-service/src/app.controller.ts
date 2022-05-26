import { Controller, Post, Get, Body, Logger } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  private logger = new Logger('AppController')
  constructor(private readonly appService: AppService) {}

  @Post()
  async logData(@Body() data: any) {
    this.logger.log(`Logged: ${data}`)
    await this.appService.logData(data)
  }

  @Get()
  async getLogs() {
    const logs = await this.appService.loadLogs()
    this.logger.log(`Loaded logs: ${logs}`)

    return `Logs: ${Array.from(logs).join(',')}`
  }
}
