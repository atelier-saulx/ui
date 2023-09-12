import React, { FC, useState } from 'react'
import { Text, Select, styled, SelectOption, Accept, Row } from '~'
import { ServiceNamed, OnMachineConfigChange } from '../../../types'
import { useQuery } from '@based/react'
import { prettyDate } from '@based/pretty-date'

const Info: FC<{
  dist: {
    checksum: string
    updatedAt?: number
    parents?: any[]
  }
}> = ({ dist }) => {
  // console.log(dist)

  return (
    <Row>
      {dist.parents.length === 0 ? (
        <>
          <Text color="red" style={{ marginRight: 8 }} typography="body600">
            HF {dist.checksum.slice(0, 10)}
          </Text>
        </>
      ) : (
        <>
          <Text typography="body600" color="accent">
            {dist.parents[0].tag}
          </Text>
          {dist.parents[0].updatedAt ? (
            <Text
              typography="body400"
              color="text2"
              style={{
                marginLeft: 8,
              }}
            >
              from {prettyDate(dist.parents[0].updatedAt, 'date-time-human')}
            </Text>
          ) : null}
        </>
      )}
    </Row>
  )
}

export const Version: FC<{
  service: ServiceNamed
  alwaysAccept: boolean
  onChange: OnMachineConfigChange
  dists: any
}> = ({ service, alwaysAccept, onChange, dists }) => {
  const selectOptions: SelectOption[] =
    dists[service.name]?.map((dist) => {
      return {
        label: <Info dist={dist} />,
        value: dist.checksum,
      }
    }) || []
  const [newVersion, updateVersion] = useState<string>()

  return (
    <styled.div style={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
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
