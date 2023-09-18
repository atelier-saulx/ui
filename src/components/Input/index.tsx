/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, ReactNode } from 'react'
import { TextInput, TextInputProps } from './TextInput'
import { SelectInput, SelectInputProps, SelectInputOption } from './SelectInput'
import { SearchInput, SearchInputProps } from './SearchInput'
import { FileInput, FileInputProps } from './FileInput'
import { NumberInput, NumberInputProps } from './NumberInput'
import { IconAlertFill, color } from '~'
import { CheckboxInput, CheckboxInputProps } from './CheckboxInput'

export type CommonInputProps = {
  label?: string
  error?: string
}

export { SelectInputOption }

export type InputProps = CommonInputProps &
  (
    | ({ type: 'text' } & TextInputProps)
    | ({ type: 'search' } & SearchInputProps)
    | ({ type: 'select' } & SelectInputProps)
    | ({ type: 'number' } & NumberInputProps)
    | ({ type: 'file' } & FileInputProps)
    | ({ type: 'checkbox' } & CheckboxInputProps)
  )

export function Input(props: InputProps) {
  switch (props.type) {
    case 'text': {
      const { type, ...narrowedProps } = props
      return (
        <LabelAndErrorWrapper label={props.label} error={props.error}>
          <TextInput {...narrowedProps} />
        </LabelAndErrorWrapper>
      )
    }
    case 'search': {
      const { type, ...narrowedProps } = props
      return (
        <LabelAndErrorWrapper label={props.label} error={props.error}>
          <SearchInput {...narrowedProps} />
        </LabelAndErrorWrapper>
      )
    }
    case 'select': {
      const { type, ...narrowedProps } = props
      return (
        <LabelAndErrorWrapper label={props.label} error={props.error}>
          <SelectInput {...narrowedProps} />
        </LabelAndErrorWrapper>
      )
    }
    // TODO no official design for this just yet
    case 'number': {
      const { type, ...narrowedProps } = props
      return <NumberInput {...narrowedProps} />
    }
    case 'file': {
      const { type, ...narrowedProps } = props
      return (
        <LabelAndErrorWrapper label={props.label} error={props.error}>
          <FileInput {...narrowedProps} />
        </LabelAndErrorWrapper>
      )
    }
    case 'checkbox': {
      const { type, ...narrowedProps } = props
      return (
        <LabelAndErrorWrapper label={props.label} error={props.error}>
          <CheckboxInput {...narrowedProps} />
        </LabelAndErrorWrapper>
      )
    }
    default:
      expectNever(props)
  }
}

export type LabelAndErrorWrapperProps = {
  label?: string
  error?: string
  children: ReactNode
}

function LabelAndErrorWrapper({
  label,
  error,
  children,
}: LabelAndErrorWrapperProps) {
  const Component = label || error ? 'div' : Fragment
  const componentProps = label || error ? { style: { display: 'block' } } : {}

  return (
    <Component {...componentProps}>
      {label && (
        <div
          style={{
            marginBottom: 8,
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '24px',
            color: color('content', 'default', 'primary'),
          }}
        >
          {label}
        </div>
      )}
      {children}
      {error && (
        <div
          style={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            color: color('content', 'negative', 'primary'),
          }}
        >
          <IconAlertFill />
          <div
            style={{
              marginLeft: 5,
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '24px',
            }}
          >
            {error}
          </div>
        </div>
      )}
    </Component>
  )
}

const expectNever = (value: never): never => {
  throw new TypeError('Unexpected value: ' + JSON.stringify(value))
}
