import React, {
  FC,
  RefObject,
  FunctionComponent,
  ReactNode,
  useEffect,
} from 'react'
import { Style, styled, color, Icon, renderOrCreateElement } from '~'
import { NumberInput } from './NumberInput'
import isEmail from 'is-email'

type SingleProps = {
  type?: string
  inputRef?: RefObject<any>
  value?: any
  pattern?: string
  props?: any
  onKeyDown?: (e: any) => void
  onChange?: (e: any) => void
  onFocus?: () => void
  onBlur?: () => void
  style?: Style
  ghost?: boolean
  focused?: boolean
  icon?: FunctionComponent<Icon> | ReactNode
  iconRight?: FunctionComponent<Icon> | ReactNode
  setErrorMessage?: (e) => void
  error?: (str: string, patternMatches?: boolean) => string // show error
  min?: number
  max?: number
  multipleOf?: number
  exclusiveMinimum?: boolean
  exclusiveMaximum?: boolean
}

export const Single: FC<SingleProps> = ({
  type,
  inputRef,
  // value,
  pattern,
  style,
  ghost,
  focused,
  icon,
  iconRight,
  setErrorMessage,
  error,
  // onChange,
  min,
  max,
  multipleOf,
  exclusiveMinimum,
  exclusiveMaximum,
  ...props
}) => {
  useEffect(() => {
    if (type === 'email') {
      if (!isEmail(props.value) && props.value.length > 0) {
        setErrorMessage(`Please enter a valid email-address`)
      } else {
        setErrorMessage('')
      }
    }

    if (pattern) {
      const v =
        typeof props.value === 'number' ? String(props.value) : props.value
      const reOk = v === '' || new RegExp(pattern).test(v)
      const msg = error
        ? error(props.value, reOk)
        : reOk
        ? ''
        : 'Does not match pattern'
      if (msg) {
        setErrorMessage(msg)
      } else {
        setErrorMessage('')
      }
    }
  }, [props.value])

  return (
    <styled.div
      style={{
        position: 'relative',
        color: color('text'),
        border: ghost
          ? `2px solid transparent`
          : focused
          ? `2px solid rgba(44, 60, 234, 0.2)`
          : `2px solid transparent`,
        borderRadius: 10,
        width: '100%',
      }}
    >
      {icon
        ? renderOrCreateElement(icon, {
            style: {
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translate3d(0,-50%,0)',
              pointerEvents: 'none',
            },
          })
        : null}

      <input
        {...props}
        type={type}
        ref={inputRef}
        pattern={pattern}
        style={{
          width: '100%',
          userSelect: 'text',
          MozUserSelect: 'text',
          WebkitUserSelect: 'text',
          ...style,
        }}
      />
      {iconRight
        ? renderOrCreateElement(iconRight, {
            style: {
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translate3d(0,-50%,0)',
              pointerEvents: 'none',
            },
          })
        : null}

      {type === 'number' && (
        <NumberInput
          value={props.value}
          onChange={props.onChange}
          min={min}
          max={max}
          multipleOf={multipleOf}
          exclusiveMinimum={exclusiveMinimum}
          exclusiveMaximum={exclusiveMaximum}
        />
      )}
    </styled.div>
  )
}
