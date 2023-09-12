import { MachineConfig } from '@based/machine-config'
import React, { FC, useState } from 'react'
import { Button, AddIcon, AccordionItem, Row, RowEnd, border } from '~'
import { EnvMachinesStatus } from '../../EnvMachinesStatus'
import { ServiceNamed, OnMachineConfigChange } from '../../types'
import { Service } from './Service'
import { useAddService } from './useAddService'
import { Commands } from './Commands'
import { useQuery } from '@based/react'

export const Services: FC<{
  configName: string
  config: MachineConfig & { configName?: string }
  onChange: OnMachineConfigChange
  alwaysAccept?: boolean
}> = ({ config, configName, onChange, alwaysAccept }) => {
  const { data: dists = {} } = useQuery<{
    [key: string]: any[]
  }>(
    'dists',
    {},
    {
      persistent: true,
    }
  )

  const services: ServiceNamed[] = []
  const [isExpand, setExpand] = useState(false)

  // TODO: Weird selva bug
  // when empty record return an empty object not NULL
  if (config.services === null) {
    config.services = {}
  }

  for (const key in config.services) {
    services.push({ name: key, ...config.services[key] })
  }

  const [newServices, add] = useAddService(
    config,
    onChange,
    alwaysAccept,
    services.length,
    configName
  )

  return (
    <AccordionItem
      label="Services"
      onExpand={(v) => {
        setExpand(v)
      }}
      expanded={isExpand}
      topRight={<EnvMachinesStatus count={services.length} type="service" />}
    >
      <RowEnd
        style={{
          borderBottom: border(1),
          marginBottom: 24,
          paddingBottom: 24,
        }}
      >
        <Row>
          {alwaysAccept ? null : <Commands configName={configName} />}
          <Button icon={<AddIcon />} onClick={add} ghost>
            Add service
          </Button>
        </Row>
      </RowEnd>
      {services.map((s) => {
        return (
          <Service
            dists={dists}
            alwaysAccept={alwaysAccept}
            onChange={onChange}
            config={config}
            configName={configName}
            service={s}
            key={s.name}
          />
        )
      })}
      {newServices}
    </AccordionItem>
  )
}
