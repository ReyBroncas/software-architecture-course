import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

const logger = new Logger('Main')

const microservicesOptions: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RMQ_URL],
    queue: 'lab4-queue',
    queueOptions: {
      durable: false,
    },
  },
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microservicesOptions,
  )

  logger.log('Message Service is listening...')
  await app.listen()
}
bootstrap()
