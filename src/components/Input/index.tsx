/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react'
import { TextInput, TextInputProps } from './TextInput'
import { SelectInput, SelectInputProps, SelectInputOption } from './SelectInput'
import { SearchInput, SearchInputProps } from './SearchInput'
import { FileInput, FileInputProps } from './FileInput'
import { NumberInput, NumberInputProps } from './NumberInput'
import { IconAlertFill, color, styled, Text } from '~'
import { CheckboxInput, CheckboxInputProps } from './CheckboxInput'
// import { MarkdownInput, MarkdownInputProps } from './MarkdownInput'
import { MultilineInput, MultilineInputProps } from './MultilineInput'

export type CommonInputProps = {
  label?: string
  error?: boolean
  message?: ReactNode
  description?: string
  indent?: boolean
}

export { SelectInputOption }

// | ({ type: 'markdown' } & MarkdownInputProps)
export type InputProps = CommonInputProps &
  (
    | ({ type: 'text' } & TextInputProps)
    | ({ type: 'multiline' } & MultilineInputProps)
    | ({ type: 'search' } & SearchInputProps)
    | ({ type: 'select' } & SelectInputProps)
    | ({ type: 'number' } & NumberInputProps)
    | ({ type: 'file' } & FileInputProps)
    | ({ type: 'checkbox' } & CheckboxInputProps)
    | ({ type: 'password' } & TextInputProps)
  )

export function Input(props: InputProps) {
  switch (props.type) {
    case 'text': {
      const { type, ...narrowedProps } = props
      return (
        <LabelAndErrorWrapper
          message={props.message}
          label={props.label}
          error={props.error}
        >
          <TextInput {...narrowedProps} />
        </LabelAndErrorWrapper>
      )
    }
    case 'multiline': {
      const { type, ...narrowedProps } = props
      return (
        <LabelAndErrorWrapper
          message={props.message}
          label={props.label}
          error={props.error}
        >
          <MultilineInput {...narrowedProps} />
        </LabelAndErrorWrapper>
      )
    }
    case 'search': {
      const { type, ...narrowedProps } = props
      return (
        <LabelAndErrorWrapper
          message={props.message}
          label={props.label}
          error={props.error}
        >
          <SearchInput {...narrowedProps} />
        </LabelAndErrorWrapper>
      )
    }
    case 'select': {
      const { type, ...narrowedProps } = props
      return (
        <LabelAndErrorWrapper
          message={props.message}
          label={props.label}
          error={props.error}
        >
          <SelectInput {...narrowedProps} />
        </LabelAndErrorWrapper>
      )
    }
    // TODO no official design for this just yet
    case 'number': {
      const { type, ...narrowedProps } = props
      return <NumberInput {...narrowedProps} />
    }
    // case 'markdown': {
    //   const { type, ...narrowedProps } = props
    //   return <MarkdownInput {...narrowedProps} />
    // }
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
    case 'password': {
      const { type, ...narrowedProps } = props
      return (
        <LabelAndErrorWrapper label={props.label} error={props.error}>
          <TextInput {...narrowedProps} password />
        </LabelAndErrorWrapper>
      )
    }
    default:
      expectNever(props)
  }
}

export type LabelAndErrorWrapperProps = {
  label?: string
  error?: boolean
  message?: ReactNode
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
  message,
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
            outline: 'none',
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
          '&:focus > input': {
            outline: 'none',
          },
        },
      }
    : {
        style: {
          display: 'block',
          '&:focus': {
            outline: 'none',
          },
        },
      }

  // tabIndex={1}
  return (
    <styled.div {...componentProps}>
      {label && (
        <Text
          weight="strong"
          style={{
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      {children}
      {description && (
        <styled.div style={{ marginTop: 8 }}>
          <Text light>{description}</Text>
        </styled.div>
      )}
      {message && (
        <div
          style={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            color: color('content', error ? 'negative' : 'brand'),
          }}
        >
          {error ? <IconAlertFill color="inherit" /> : null}
          <div
            style={{
              marginLeft: 5,
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '24px',
            }}
          >
            {message}
          </div>
        </div>
      )}
    </styled.div>
  )
}

const expectNever = (value: never): never => {
  throw new TypeError('Unexpected value: ' + JSON.stringify(value))
}
