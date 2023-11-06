import React, { FC, ReactNode } from 'react'
import { border } from '../../../varsUtilities'
import { Text, Confirmation, RowEnd, Row, RowSpaced } from '../..'
import { FormItem } from './Item'
import { getValue } from '../utils'
import { Style, styled } from 'inlines'
import { FormGroupVariantProps } from '../types'

const Group: FC<{ children: ReactNode; style?: Style }> = ({
  children,
  style,
}) => {
  return (
    <RowSpaced
      style={{
        ...style,
        borderTop: border(1),
        marginLeft: -8,
        marginRight: -8,
        marginTop: 16,
        paddingTop: 8,
        flexWrap: 'wrap',
      }}
    >
      {children}
    </RowSpaced>
  )
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
  autoFocus,
  style,
}) => {
  const checkBoxes: ReactNode[] = []
  const rest: ReactNode[] = []

  let hasAutoFocus = false

  for (const d of parsedData) {
    if (d.type === 'checkbox') {
      checkBoxes.push(
        <FormItem
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
          onChangeObj={onChange}
          objValues={values}
          hasChanges={hasChanges}
          valuesChanged={valuesChanged}
          setChanges={setChanges}
          alwaysAccept={alwaysAccept}
        />
      )
    } else {
      rest.push(
        <FormItem
          autoFocus={!hasAutoFocus && autoFocus}
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
          onChangeObj={onChange}
          objValues={values}
          hasChanges={hasChanges}
          valuesChanged={valuesChanged}
          setChanges={setChanges}
          alwaysAccept={alwaysAccept}
        />
      )
      hasAutoFocus = true
    }
  }

  return (
    <Group style={style}>
      <styled.div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${
            fieldWidth * 2
          }px, 2fr))`,
          gridGap: 12,
          width: '100%',
        }}
      >
        {rest}
      </styled.div>
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
      <styled.div style={{ width: fieldWidth * 2 + 'px' }} />
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
            onConfirm={async () => {
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
