import React from 'react'
import {
  Button,
  Accordion,
  useContextState,
  RowSpaced,
  Dialog,
  MoreIcon,
  useContextMenu,
} from '~'
import { useQuery, useClient } from '@based/react'
import { Env } from '@based/machine-config'
import { Services } from './Services'
import { Settings } from './Settings'
import { EnvMachinesStatus } from '../EnvMachinesStatus'
import { Actions } from '.'

export const SettingsModal = ({ configName }) => {
  const client = useClient()
  const [env] = useContextState<Env>('env')
  const { data: envData } = useQuery('env', env)
  const machineStatus = envData?.machineStatus?.[configName]
  const config = envData?.config?.machineConfigs?.[configName] ?? {}

  return (
    <Dialog
      style={{
        width: '90%',
        maxWidth: 1300,
      }}
    >
      <Dialog.Label>
        <RowSpaced>
          {configName}
          <Button
            icon={<MoreIcon />}
            ghost
            onClick={useContextMenu(Actions, { config, configName })}
          />
        </RowSpaced>
      </Dialog.Label>
      <EnvMachinesStatus
        style={{
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 24,
        }}
        goodColor="green"
        resizing={machineStatus.resizing}
        removing={machineStatus.removing}
        running={machineStatus.amount - machineStatus.failing}
        unreachable={machineStatus.failing}
        deploying={machineStatus.deploying}
        type="machine"
      />
      <Accordion>
        <Settings
          configName={configName}
          config={config}
          onChange={(config) => {
            const payload = {
              ...env,
              configName,
              config,
            }
            return client.call('update-machine-config', payload)
          }}
        />
        <Services
          onChange={(config) => {
            const payload = {
              ...env,
              configName,
              config,
            }
            return client.call('update-machine-config', payload)
          }}
          configName={configName}
          config={config}
        />
      </Accordion>
    </Dialog>
  )
}
