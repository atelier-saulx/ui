import React, { FC, ReactNode } from 'react'
import { border } from '../../../varsUtilities'
import { Text, Confirmation, RowEnd, Row } from '../..'
import { SettingsField, Group } from './Item'
import { getValue } from '../utils'
import { FormGroupVariantProps } from '../types'
import { Empty } from './Item'

export const emptyDivs = (arr: ReactNode[]) => {
  for (let i = 0; i < 5; i++) {
    arr.push(<Empty key={'e' + i} />)
  }
}

export const FormGroupGrid: FC<FormGroupVariantProps> = ({
  onChange,
  parsedData,
  fieldWidth,
  onChangeField,
  labelWidth,
  hasChanges,
  valuesChanged,
  values,
  alwaysAccept,
  setChanges,
  style,
}) => {
  const checkBoxes: ReactNode[] = []
  const rest: ReactNode[] = []

  for (const d of parsedData) {
    if (d.type === 'boolean') {
      checkBoxes.push(
        <SettingsField
          fieldWidth={fieldWidth}
          width={labelWidth}
          key={d.field}
          item={d}
          onChange={onChangeField}
          value={
            d.value ??
            (hasChanges
              ? getValue(d.field, valuesChanged.current) ??
                d.value ??
                getValue(d.field, values)
              : getValue(d.field, values))
          }
        />
      )
    } else {
      rest.push(
        <SettingsField
          fieldWidth={fieldWidth}
          width={labelWidth}
          key={d.field}
          item={d}
          onChange={onChangeField}
          value={
            hasChanges
              ? getValue(d.field, valuesChanged.current) ??
                d.value ??
                getValue(d.field, values)
              : d.value ?? getValue(d.field, values)
          }
        />
      )
    }
  }

  if (rest.length) {
    emptyDivs(rest)
  }

  if (checkBoxes.length) {
    emptyDivs(checkBoxes)
  }

  return (
    <Group style={style}>
      {rest}
      {checkBoxes.length && rest.length ? (
        <Row
          style={{
            width: '100%',
            borderTop: border(1),
            marginTop: 16,
            padding: 8,
            paddingTop: 16,
            flexWrap: 'wrap',
          }}
        >
          {checkBoxes}
        </Row>
      ) : (
        checkBoxes
      )}
      {alwaysAccept || !hasChanges ? null : (
        <RowEnd
          style={{
            borderTop: border(1),
            width: '100%',
            marginTop: 16,
            paddingTop: 16,
            marginRight: 8,
          }}
        >
          <Text light>Apply changes</Text>
          <Confirmation
            onCancel={() => {
              valuesChanged.current = {}
              setChanges(false)
            }}
            onAccept={async () => {
              await onChange(valuesChanged.current)
              valuesChanged.current = {}
              setChanges(false)
            }}
          />
        </RowEnd>
      )}
    </Group>
  )
}
