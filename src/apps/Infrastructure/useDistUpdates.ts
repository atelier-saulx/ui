import { MachineConfig } from '@based/machine-config'
import { useQuery } from '@based/react'
import { useMemo } from 'react'
import { Dist } from './types'

type Update = {
  dist: Dist
  configName: string
  fromVersion: string
}[]

export const useDistUpdates = (
  machineConfigs: {
    [key: string]: MachineConfig | Pick<MachineConfig, 'services'>
  },
  checksum?: number
): Update => {
  const { data: dists = {}, checksum: distChecksum } = useQuery<{
    [key: string]: Dist[]
  }>(
    'dists',
    {},
    {
      persistent: true,
    }
  )

  return useMemo(() => {
    const needUpdate: Update = []
    for (const configName in machineConfigs) {
      const config = machineConfigs[configName]
      for (const serviceName in config.services) {
        const service = config.services[serviceName]
        const serviceDists = dists[serviceName]
        if (!serviceDists) {
          return []
        }
        const currentDist = serviceDists.find(
          (d) => d.checksum === service.distChecksum
        )
        if (!currentDist) {
          // is detached
          needUpdate.push({
            configName,
            dist: serviceDists[0],
            fromVersion: 'Detached',
          })
        } else {
          for (const d of serviceDists) {
            if (d.index > currentDist.index) {
              needUpdate.push({
                configName,
                dist: d,
                fromVersion: currentDist.version,
              })
              break
            }
          }
        }
      }
    }
    return needUpdate
  }, [distChecksum, checksum ?? machineConfigs])
}
