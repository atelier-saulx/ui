import { Env, MachineConfig } from '@based/machine-config'
import React, { FC, useRef } from 'react'
import { useDistUpdates } from './useDistUpdates'
import {
  Button,
  Badge,
  Text,
  useDialog,
  Dialog,
  Row,
  border,
  RowSpaced,
  ArrowRightIcon,
  RowEnd,
  CloseIcon,
  useUpdate,
  removeAllOverlays,
  useContextState,
} from '~'
import { useClient } from '@based/react'
import { deepCopy } from '@saulx/utils'
import { DeepPartial } from 'utility-types'
import { prettyDate } from '@based/pretty-date'

const Modal: FC<{
  updates: ReturnType<typeof useDistUpdates>
}> = ({ updates }) => {
  const copiedUpdates = useRef(deepCopy(updates))
  const client = useClient()
  const update = useUpdate()
  const [env] = useContextState<Env>('env')

  return (
    <Dialog
      style={{
        minWidth: 750,
      }}
    >
      <Dialog.Label>Upgrade services</Dialog.Label>
      <Dialog.Body>
        {copiedUpdates.current.map((d, i) => {
          return (
            <RowSpaced
              style={{
                marginBottom: 16,
                paddingTop: 16,
                borderTop: border(1),
              }}
              key={i}
            >
              <Row>
                <Button
                  onClick={() => {
                    copiedUpdates.current.splice(i, 1)
                    if (copiedUpdates.current.length === 0) {
                      removeAllOverlays()
                    } else {
                      update()
                    }
                  }}
                  color="accent"
                  style={{ marginRight: 16 }}
                  ghost
                  icon={<CloseIcon />}
                />
                <Text
                  style={{
                    marginRight: 16,
                  }}
                  typography="body600"
                >
                  {d.configName}
                </Text>
              </Row>
              <RowEnd>
                <Text style={{ marginRight: 16, width: 250 }} color="accent">
                  {d.dist.name}
                </Text>
                <Row>
                  <Text style={{ marginRight: 16 }} typography="body600">
                    {d.fromDist.parents.length > 0
                      ? d.fromDist.parents[d.fromDist.parents.length - 1].tag
                      : `HOTFIX (${prettyDate(
                          d.dist.updatedAt,
                          'date-time-human'
                        )})`}
                  </Text>
                  <ArrowRightIcon style={{ marginRight: 16 }} />
                  {d.dist.parents.length > 0 ? (
                    <Text typography="body600">
                      {d.dist.parents[d.dist.parents.length - 1].tag}
                    </Text>
                  ) : (
                    <Text typography="body600" color="red">
                      HOTFIX ({prettyDate(d.dist.updatedAt, 'date-time-human')})
                    </Text>
                  )}
                </Row>
              </RowEnd>
            </RowSpaced>
          )
        })}
      </Dialog.Body>
      <Dialog.Buttons>
        <Dialog.Cancel />

        <Dialog.Confirm
          onConfirm={async () => {
            const configs: {
              [key: string]: DeepPartial<MachineConfig>
            } = {}

            for (const update of copiedUpdates.current) {
              if (!configs[update.configName]) {
                configs[update.configName] = { services: {} }
              }
              configs[update.configName].services[update.dist.name] = {
                distChecksum: update.dist.checksum,
              }
            }
            const q = []
            for (const configName in configs) {
              const config = configs[configName]
              q.push(
                client.call('update-machine-config', {
                  ...env,
                  config,
                  configName,
                })
              )
            }
            return Promise.all(q)
          }}
        />
      </Dialog.Buttons>
    </Dialog>
  )
}

export const UpdateButton: FC<{
  small?: boolean
  machineConfigs?: {
    [key: string]: MachineConfig | Pick<MachineConfig, 'services'>
  }
  checksum?: number
}> = ({ machineConfigs, checksum, small }) => {
  const { open } = useDialog()
  const updates = useDistUpdates(machineConfigs || {}, checksum)

  return updates.length ? (
    <Button
      transparent={small}
      style={{ marginRight: 8 }}
      onClick={() => {
        open(<Modal updates={updates} />)
      }}
      ghost
      color="accent"
      icon={
        <Badge color="accent" style={{ marginRight: small ? 0 : 8 }}>
          {updates.length}
        </Badge>
      }
    >
      {small ? null : `Upgrade${updates.length > 1 ? 's' : ''} available`}
    </Button>
  ) : null
}
