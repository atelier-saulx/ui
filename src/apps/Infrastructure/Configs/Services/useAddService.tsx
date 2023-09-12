import React, { useMemo, useRef, ReactNode } from 'react'
import { Text, useSelect, useUpdate, Accept } from '~'
import { ServiceNamed, Dist, OnMachineConfigChange } from '../../types'
import { useQuery } from '@based/react'
import { MachineConfig } from '@based/machine-config'
import { deepMerge } from '@saulx/utils'
import { Service } from './Service'

export const useAddService = (
  config: MachineConfig,
  onChange: OnMachineConfigChange,
  alwaysAccept: boolean,
  checksum: number,
  configName: string
): [ReactNode[], ReturnType<typeof useSelect>[1]] => {
  const update = useUpdate()

  const { data: dists = {}, checksum: distChecksum } = useQuery<{
    [key: string]: Dist[]
  }>(
    'dists',
    {},
    {
      persistent: true,
    }
  )

  const options = useMemo(() => {
    return Object.keys(dists)
      .filter((f) => !(f in (config?.services || {})))
      .map((v) => {
        // Will make nice explanation for all the services (also in dists)
        return {
          label: (
            <div>
              <Text typography="body600">{v}</Text>
            </div>
          ),
          value: v,
        }
      })
  }, [distChecksum, checksum])

  const newServices = useRef<any>({ services: {} })

  const [, add] = useSelect(
    options,
    null,
    (name) => {
      if (!name) {
        return
      }
      const service = {
        distChecksum: dists[name][0].checksum,
        instances: {
          '0': {
            port: 80,
          },
        },
      }
      if (alwaysAccept) {
        config.services[name] = service
        onChange(config)
      } else {
        newServices.current.services[name] = service
      }
      update()
    },
    { noValue: true, filterable: true }
  )

  const newServicesItems: ServiceNamed[] = []
  for (const key in newServices.current.services) {
    newServicesItems.push({ name: key, ...newServices.current.services[key] })
  }

  const newServicesNodes = newServicesItems.map((s) => {
    return (
      <Service
        dists={dists}
        configName={configName}
        key={'n' + s.name}
        alwaysAccept
        onChange={(values) => {
          deepMerge(newServices.current, values)
          update()
        }}
        config={newServices.current}
        service={s}
      >
        <Accept
          onAccept={async () => {
            await onChange(newServices.current)
            newServices.current = { services: {} }
          }}
          onCancel={() => {
            delete newServices.current.services[s.name]
            update()
          }}
        />
      </Service>
    )
  })

  return [newServicesNodes, add]
}
