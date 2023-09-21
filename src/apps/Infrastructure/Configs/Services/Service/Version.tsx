import React, { FC, useState } from 'react'
import {
  Text,
  Select,
  styled,
  SelectOption,
  Accept,
  Row,
  Button,
  JsonIcon,
  Code,
  useOverlay,
} from '~'
import { ServiceNamed, OnMachineConfigChange, Dist } from '../../../types'
import { prettyDate } from '@based/pretty-date'

const Info: FC<{
  dist: Dist
}> = ({ dist }) => {
  return (
    <Row>
      {dist.parents ? (
        dist.parents.length === 0 ? (
          <>
            <Text color="red" style={{ marginRight: 8 }} typography="body600">
              HOTFIX {dist.checksum.slice(0, 10)} (
              {prettyDate(dist.updatedAt, 'date-time-human')})
            </Text>
          </>
        ) : (
          <>
            <Text typography="body600" color="accent">
              {dist.parents[dist.parents.length - 1].tag}
            </Text>
            {dist.parents[dist.parents.length - 1].updatedAt ? (
              <Text
                typography="body400"
                color="text2"
                style={{
                  marginLeft: 8,
                }}
              >
                from{' '}
                {prettyDate(
                  dist.parents[dist.parents.length - 1].updatedAt,
                  'date-time-human'
                ).toLowerCase()}
              </Text>
            ) : null}
          </>
        )
      ) : null}
    </Row>
  )
}

export const Version: FC<{
  service: ServiceNamed
  alwaysAccept: boolean
  onChange: OnMachineConfigChange
  dists: Dist[]
}> = ({ service, alwaysAccept, onChange, dists }) => {
  const selectOptions: SelectOption[] =
    dists[service.name]?.map((dist) => {
      return {
        label: <Info dist={dist} />,
        value: dist.checksum,
      }
    }) || []
  const [newVersion, updateVersion] = useState<string>()
  const showJson = useOverlay(
    ShowJSON,
    {
      data: dists[service.name].filter(
        (dist) => dist.checksum === (newVersion || service.distChecksum)
      )[0],
    },
    {
      width: '100%',
      placement: 'left',
    },
    undefined,
    undefined,
    {
      style: {
        scrollbarGutter: 'auto',
      },
    }
  )

  return (
    <styled.div style={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
      <Button
        icon={JsonIcon}
        ghost
        style={{
          padding: 12,
          marginRight: 4,
        }}
        onClick={showJson}
      />
      <Select
        label={<Text style={{ marginRight: 16 }}>{service.name}</Text>}
        value={service.distChecksum}
        options={selectOptions}
        onChange={(v) => {
          if (alwaysAccept) {
            onChange({
              services: {
                [service.name]: {
                  distChecksum: newVersion,
                },
              },
            })
          } else {
            updateVersion(v as string)
          }
        }}
      />
      {newVersion && !alwaysAccept ? (
        <Accept
          style={{ flexShrink: 0 }}
          onCancel={() => {
            updateVersion('')
          }}
          onAccept={() => {
            onChange({
              services: {
                [service.name]: {
                  distChecksum: newVersion,
                },
              },
            })
            updateVersion('')
          }}
        />
      ) : null}
    </styled.div>
  )
}

const ShowJSON = ({ data }) => {
  return (
    // TODO: get help for styling this looks bad
    <Code
      style={{
        minWidth: 900,
      }}
      value={JSON.stringify(data, null, 2)}
      onChange={() => {}}
    />
  )
}
