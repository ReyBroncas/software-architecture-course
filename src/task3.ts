import { Client } from 'hazelcast-client'

const producer = async () => {
  const hz = await Client.newHazelcastClient({
    clusterName: 'hazel_intro',
    network: {
      clusterMembers: ['hazel_1:5701'],
    },
  })

  const queue = await hz.getQueue('task3_queue')
  for (let i = 0; i < 100; i += 1) {
    await queue.put(i)

    console.log(`Produced: ${i}`)
  }

  hz.shutdown()
}

const consumer = async () => {
  const hz = await Client.newHazelcastClient({
    clusterName: 'hazel_intro',
    network: {
      clusterMembers: ['hazel_1:5701'],
    },
  })

  const queue = await hz.getQueue('task3_queue')
  for (let i = 0; i < 100; i += 1) {
    const value = await queue.take()

    console.log(`Consumed: ${value}`)
  }
  hz.shutdown()
}

const main = async () => {
  const promise1 = producer()
  const promise2 = consumer()

  await Promise.all([promise1, promise2])
}

main()
