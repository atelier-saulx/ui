import { MachineConfig } from '@based/machine-config'
import React, { FC, ReactNode } from 'react'
import {
  Button,
  AddIcon,
  MoreIcon,
  useContextMenu,
  RowSpaced,
  Row,
  RowEnd,
  styled,
  border,
} from '~'
import { ServiceNamed, OnMachineConfigChange } from '../../../types'
import { Instance } from '../Instance'
import { Actions } from './Actions'
import { useAddInstances } from './useAddInstances'
import { Version } from './Version'

export const Service: FC<{
  service: ServiceNamed
  onChange: OnMachineConfigChange
  config: MachineConfig
  configName: string
  alwaysAccept?: boolean
  children?: ReactNode
  dists: any
}> = ({
  dists,
  service,
  config,
  onChange,
  alwaysAccept,
  children,
  configName,
}) => {
  // TODO put actions

  const [newInstances, acceptNewInstanceButton, addInstance] = useAddInstances(
    service,
    alwaysAccept,
    onChange
  )

  const instances: ReactNode[] = []
  for (const x in service.instances) {
    instances.push(
      <Instance
        alwaysAccept={alwaysAccept}
        onChange={onChange}
        key={x}
        service={service}
        instance={service.instances[x]}
        index={x}
      />
    )
  }

  return (
    <styled.div
      style={{
        marginBottom: 24,
        paddingBottom: 32,
        borderBottom: border(1),
      }}
    >
      <RowSpaced>
        <Version
          dists={dists}
          service={service}
          alwaysAccept={alwaysAccept}
          onChange={onChange}
        />
        <Row>
          <Button
            icon={<MoreIcon />}
            ghost
            onClick={useContextMenu(Actions, {
              config,
              service,
              alwaysAccept,
              configName,
              onChange,
            })}
          />
          <Button color="text" icon={<AddIcon />} onClick={addInstance} ghost />
        </Row>
      </RowSpaced>
      <styled.div
        style={{
          marginTop: 24,
        }}
      >
        {instances}
        {newInstances}
      </styled.div>
      <RowEnd style={{ marginTop: 24 }}>
        {acceptNewInstanceButton}
        {children}
      </RowEnd>
    </styled.div>
  )
}
