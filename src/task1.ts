import { Client } from 'hazelcast-client'

const main = async () => {
  const hz = await Client.newHazelcastClient({
    clusterName: 'hazel_intro',
    network: {
      clusterMembers: ['hazel_1:5701'],
    },
  })

  const map = await hz.getMap('my-distributed-map')

  for (let i = 0; i < 1000; i += 1) {
    map.put(i, `value-${i}`)
  }

  hz.shutdown()
}

main()
