/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, ReactNode } from 'react'
import { TextInput, TextInputProps } from './TextInput'
import { SelectInput, SelectInputProps, SelectInputOption } from './SelectInput'
import { SearchInput, SearchInputProps } from './SearchInput'
import { FileInput, FileInputProps } from './FileInput'
import { NumberInput, NumberInputProps } from './NumberInput'
import { IconAlertFill, color, styled, Text } from '~'
import { CheckboxInput, CheckboxInputProps } from './CheckboxInput'

export type CommonInputProps = {
  label?: string
  error?: string
  description?: string
  indent?: boolean
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
        <LabelAndErrorWrapper
          label={props.label}
          error={props.error}
          indent={props.indent}
          description={props.description}
        >
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
  description?: string
  indent?: boolean
  children: ReactNode
}

function LabelAndErrorWrapper({
  label,
  error,
  children,
  indent,
  description,
}: LabelAndErrorWrapperProps) {
  // TODO: temp change maybe idk how to get this to be a styled div
  // const Component = indent || label || description || error ? 'div' : Fragment
  const componentProps = indent
    ? {
        style: {
          display: 'block',
          borderLeft: '2px solid',
          borderColor: error
            ? color('border', 'negative', 'strong')
            : color('inputBorder', 'neutralNormal', 'default'),

          '&:hover': {
            borderColor: error
              ? color('border', 'negative', 'strong')
              : color('inputBorder', 'neutralHover', 'default'),
          },
          '&:active': {
            borderColor: error
              ? color('border', 'negative', 'strong')
              : color('inputBorder', 'neutralActive', 'default'),
          },
          '&:focus': {
            borderColor: error
              ? color('border', 'negative', 'strong')
              : color('inputBorder', 'selected', 'default'),
            '&:hover': {
              borderColor: error
                ? color('border', 'negative', 'strong')
                : color('inputBorder', 'hover', 'default'),
            },
            '&:active': {
              borderColor: error
                ? color('border', 'negative', 'strong')
                : color('inputBorder', 'active', 'default'),
            },
          },
          paddingLeft: 20,
        },
      }
    : label || error || description
    ? {
        style: {
          display: 'block',
        },
      }
    : {}

  return (
    <styled.div tabIndex={1} {...componentProps}>
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
      {description && (
        <styled.div style={{ marginTop: 8 }}>
          <Text light>{description}</Text>
        </styled.div>
      )}
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
    </styled.div>
  )
}

const expectNever = (value: never): never => {
  throw new TypeError('Unexpected value: ' + JSON.stringify(value))
}
