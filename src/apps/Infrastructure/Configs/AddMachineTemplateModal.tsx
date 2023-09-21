import React, { FC, useMemo, useRef, useState } from 'react'
import {
  Dialog,
  Select,
  Input,
  useUpdate,
  StateProvider,
  Button,
  useContextState,
  CurlyBracesIcon,
  RowSpaced,
  Label,
} from '~'
import { Env, MachineConfig, Template } from '@based/machine-config'
import { deepCopy, deepMerge } from '@saulx/utils'
import { Services } from './Services'
import { Settings } from './Settings'
import { useQuery, useClient } from '@based/react'
import { Dist } from '../types'
import { EditJsonModalBody } from '../EditJson'

export const AddMachineModal: FC<{
  config?: MachineConfig
  configName?: string
}> = ({ config, configName }) => {
  const update = useUpdate()

  const [isJSON, setJSON] = useState(false)

  const { data: dists = {} } = useQuery<{
    [key: string]: Dist[]
  }>(
    'dists',
    {},
    {
      persistent: true,
    }
  )

  const copiedConfig = useMemo(() => {
    return config
      ? {
          configName: configName + '-copy',
          config: deepCopy(config),
        }
      : undefined
  }, [config])

  const [env] = useContextState<Env>('env')
  const client = useClient()
  const newConfig = useRef<{ configName: string; config: MachineConfig }>(
    copiedConfig || {
      config: {
        services: {},
        min: 1,
        max: 1,
      },
      configName: '',
    }
  )

  // useEffect(() => {
  //   setRenderCounter(renderCounter + 1)
  //   console.log('FREIE')
  // }, [newConfig])

  const { data: templates = [] } = useQuery<Template[]>(
    'machine-templates',
    undefined,
    { persistent: true }
  )

  const onConfirm = async (
    configTotal: {
      configName: string
      config: MachineConfig
    },
    ignorePorts: boolean = false
  ) => {
    const { configName, config } = configTotal
    for (const key in config.services) {
      if (config.services[key].distChecksum === 'latest') {
        config.services[key].distChecksum = dists[key][0].checksum
      }
    }
    const payload = {
      ...env,
      config,
      configName,
      ignorePorts,
    }
    await client.call('update-machine-config', payload)
  }

  const [configNameState, setConfigNameState] = useState(
    newConfig.current.configName
  )

  return (
    <StateProvider>
      <Dialog
        style={{
          maxWidth: '90vw',
          width: '925px',
        }}
      >
        {isJSON ? (
          <EditJsonModalBody
            label="Add machine template"
            actions={
              <Button
                color={isJSON ? 'accent' : 'text'}
                onClick={() => {
                  setJSON(!isJSON)
                }}
                ghost
                icon={<CurlyBracesIcon size={12} />}
              />
            }
            object={newConfig.current}
            changeObjectInPlace
            onChange={(totalConfig) => {
              // @ts-ignore TODO: make generic
              return onConfirm(totalConfig, true)
            }}
          />
        ) : (
          <>
            <Dialog.Label>
              <RowSpaced>
                Add machine template
                <Button
                  color={isJSON ? 'accent' : 'text'}
                  onClick={() => {
                    setJSON(!isJSON)
                  }}
                  ghost
                  icon={<CurlyBracesIcon size={12} />}
                />
              </RowSpaced>
            </Dialog.Label>
            <Dialog.Body>
              <Select
                style={{ marginBottom: '32px' }}
                options={templates.map((v) => v.configName)}
                value={
                  templates.find(
                    (t) => t.configName === newConfig.current.configName
                  )
                    ? newConfig.current.configName
                    : undefined
                }
                placeholder="Select a predefined template"
                onChange={(name) => {
                  if (name && newConfig.current.configName !== name) {
                    // @ts-ignore
                    const { configName, ...config } = deepCopy(
                      templates.find((t) => t.configName === name)
                    )
                    newConfig.current = {
                      configName,
                      config,
                    }

                    setConfigNameState(name.toString())
                    update()
                  }
                }}
              />
              <Label
                style={{ width: '100%', marginBottom: '24px' }}
                labelWidth={200}
                direction="row"
                description="Name has to be unique "
                label="Name"
              >
                <Input
                  style={{ width: '100%' }}
                  value={configNameState}
                  placeholder="Name"
                  onChange={(v) => {
                    newConfig.current.configName = v
                    update()
                  }}
                  type="text"
                />
              </Label>

              <Label
                style={{
                  width: '100%',
                  alignItems: 'flex-start',
                  marginBottom: '32px',
                }}
                labelWidth={200}
                direction="row"
                description="Meta information "
                label="Description"
              >
                <Input
                  style={{ width: '100%' }}
                  value={newConfig.current.config.description}
                  placeholder="Description"
                  onChange={(v) => {
                    newConfig.current.config.description = v
                    update()
                  }}
                  type="multiline"
                />
              </Label>

              <Settings
                onChange={(values) => {
                  deepMerge(newConfig.current.config, values)
                  update()
                }}
                alwaysAccept
                config={newConfig.current.config}
                configName={newConfig.current.configName}
              />
              <Services
                onChange={(values) => {
                  for (const service in values.services) {
                    console.info(newConfig.current)
                    if (!newConfig.current.configName) {
                      newConfig.current.configName =
                        'machine' + service.replace('@based/', '-')
                    }
                    if (values.services[service].instances) {
                      if (
                        newConfig.current.config.services?.[service]?.instances
                      ) {
                        for (const instance in newConfig.current.config
                          .services[service].instances) {
                          if (!values.services[service].instances[instance]) {
                            delete newConfig.current.config.services[service]
                              .instances[instance]
                          }
                        }
                      }
                    }
                  }
                  deepMerge(newConfig.current.config, values)
                  update()
                }}
                alwaysAccept
                config={newConfig.current.config}
                configName={newConfig.current.configName}
              />
            </Dialog.Body>
            <Dialog.Buttons>
              <Dialog.Cancel />
              <Dialog.Confirm
                keyboardShortcut="Cmd+Enter"
                onConfirm={() => onConfirm(newConfig.current)}
              />
            </Dialog.Buttons>
          </>
        )}
      </Dialog>
    </StateProvider>
  )
}
