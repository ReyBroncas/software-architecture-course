import { Client } from 'hazelcast-client'

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const optimisticUpdate = async (map) => {
  const key = '1'
  await map.clear()
  await map.put(key, 0)

  console.log('[optimisticUpdate] Starting')
  for (let i = 0; i < 1000; i += 1) {
    if (i % 100 === 0) console.log(`At: ${i}`)

    while (true) {
      let oldValue = (await map.get(key)) as number
      let newValue = oldValue + 1
      await sleep(50)

      if (await map.replaceIfSame(key, oldValue, newValue)) break
    }
  }
  console.log(`[optimisticUpdate] Finished! Result = ${await map.get(key)}`)
}

const pessimisticUpdate = async (map) => {
  const key = '1'
  await map.clear()
  await map.put(key, 0)

  console.log('[pessimisticUpdate] Starting')
  for (let i = 0; i < 1000; i += 1) {
    if (i % 100 === 0) console.log(`At: ${i}`)
    await map.lock(key)

    try {
      let value = (await map.get(key)) as number
      value += 1
      await sleep(50)
      await map.put(key, value)
    } finally {
      await map.unlock(key)
    }
  }
  console.log(`[pessimisticUpdate] Finished! Result = ${await map.get(key)}`)
}

const racyUpdate = async (map) => {
  const key = '1'
  await map.clear()
  await map.put(key, 0)

  console.log('[racyUpdate] Starting')
  for (let i = 0; i < 1000; i += 1) {
    if (i % 100 === 0) console.log(`At: ${i}`)

    let value = (await map.get(key)) as number
    value += 1
    await sleep(50)
    await map.put(key, value)
  }
  console.log(`[racyUpdate] Finished! Result = ${await map.get(key)}`)
}

const main = async () => {
  const params = process.argv.slice(2)
  const selection = params[0]
  const substasks = { racyUpdate, optimisticUpdate, pessimisticUpdate }

  const hz = await Client.newHazelcastClient({
    clusterName: 'hazel_intro',
    network: {
      clusterMembers: ['hazel_1:5701'],
    },
  })
  const map = await hz.getMap('task2_map')

  await substasks[selection](map)

  await hz.shutdown()
}

main()
