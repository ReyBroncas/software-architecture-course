import { Client } from 'hazelcast-client'
import { sleep } from './task2'

const producer = async (queue) => {
  for (let i = 0; i < 100; i += 1) {
    await queue.put(i)

    await sleep(50)
    console.log(`Produced: ${i}`)
  }
}

const consumer = async (queue) => {
  for (let i = 0; i < 100; i += 1) {
    const value = await queue.take()

    await sleep(50)
    console.log(`Consumed: ${value}`)
  }
}

const main = async () => {
  const params = process.argv.slice(2)
  const selection = params[0]
  const substasks = { consumer, producer }

  const hz = await Client.newHazelcastClient({
    clusterName: 'hazel_intro',
    network: {
      clusterMembers: ['hazel_1:5701'],
    },
  })
  const queue = await hz.getQueue('task3_queue')

  await substasks[selection](queue)

  await hz.shutdown()
}

main()
