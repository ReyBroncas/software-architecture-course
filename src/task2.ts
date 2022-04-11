import { Client } from 'hazelcast-client'

const optimisticUpdate = async () => {
  const hz = await Client.newHazelcastClient({
    clusterName: 'hazel_intro',
    network: {
      clusterMembers: ['hazel_1:5701'],
    },
  })

  const key = '1'
  const map = await hz.getMap('task2_map')
  map.put(key, 0)

  console.log('[optimisticUpdate] Starting')
  for (let i = 0; i < 1000; i += 1) {
    if (i % 100 === 0) console.log(`At: ${i}`)

    while (true) {
      let oldValue = (await map.get(key)) as number
      let newValue = oldValue
      newValue += 1

      if (map.replaceIfSame(key, oldValue, newValue)) break
    }
  }
  console.log(`[optimisticUpdate] Finished! Result = ${await map.get(key)}`)

  hz.shutdown()
}

const pessimisticUpdate = async () => {
  const hz = await Client.newHazelcastClient({
    clusterName: 'hazel_intro',
    network: {
      clusterMembers: ['hazel_1:5701'],
    },
  })

  const key = '1'
  const map = await hz.getMap('task2_map')
  map.put(key, 0)

  console.log('[pessimisticUpdate] Starting')
  for (let i = 0; i < 1000; i += 1) {
    await map.lock(key)

    try {
      let value = (await map.get(key)) as number
      value += 1
      await map.put(key, value)
    } finally {
      await map.unlock(key)
    }
  }
  console.log(`[pessimisticUpdate] Finished! Result = ${await map.get(key)}`)

  hz.shutdown()
}

const racyUpdate = async () => {
  const hz = await Client.newHazelcastClient({
    clusterName: 'hazel_intro',
    network: {
      clusterMembers: ['hazel_1:5701'],
    },
  })

  const key = '1'
  const map = await hz.getMap('task2_map')
  map.put(key, 0)

  console.log('[racyUpdate] Starting')
  for (let i = 0; i < 1000; i += 1) {
    if (i % 100 === 0) console.log(`At: ${i}`)

    let value = (await map.get(key)) as number
    value += 1
    await map.put(key, value)
  }
  console.log(`[racyUpdate] Finished! Result = ${await map.get(key)}`)

  hz.shutdown()
}

const main = async () => {
  const promise1 = optimisticUpdate()
  const promise2 = pessimisticUpdate()
  const promise3 = racyUpdate()

  await Promise.all([promise1, promise2, promise3])
}

main()
