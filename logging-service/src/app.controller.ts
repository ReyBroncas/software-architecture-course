import { Controller, Post, Get, Body } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  saveData(@Body() data: any) {
    console.log(data)
    this.appService.saveData(data)
  }

  @Get()
  retrieveData() {
    return this.appService.loadData()
  }
}
