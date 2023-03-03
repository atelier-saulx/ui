import React, {
  useCallback,
  useState,
  FC,
  CSSProperties,
  RefObject,
} from 'react'
// import { InputWrapper } from './InputWrapper'
import { color, renderOrCreateElement } from '~/utils'
import { styled } from 'inlines'
import { ChevronUpIcon, ChevronDownIcon } from '~/icons'
import { usePropState } from '~/hooks'
import { InputWrapper } from './InputWrapper'

type SingleProps = {
  type?: string
  inputRef?: RefObject<any>
  pattern?: string
  props?: any
  onKeyDown?: (e: any) => void
  style?: CSSProperties
}

const Single: FC<SingleProps> = ({
  type,
  inputRef,
  pattern,
  style,
  ...props
}) => {
  // if (type === 'color') {
  //   return <ColorInput inputRef={inputRef} {...props} />
  // }
  return (
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
  )
}

export const NumberInput = (props) => {
  const {
    type,
    // style,
    onChange: onChangeProp,
    transform,
    noInterrupt,
    value: valueProp,
    style,
    ghost,
    icon,
    iconRight,
    defaultValue,
    placeholder,
    disabled,
    autoFocus,
    bg,
    hover,
    inputRef,
  } = props
  const [focused] = useState(false)
  const [value = '', setValue] = usePropState(valueProp, noInterrupt && focused)
  const onChange = useCallback(
    (e: { target: { value: string } }) => {
      const newValue = transform ? transform(e.target.value) : e.target.value
      if (type === 'number') {
        setValue(+e.target.value)
        // @ts-ignore
        onChangeProp?.(+newValue)
      } else {
        setValue(newValue)
        // @ts-ignore
        onChangeProp?.(newValue)
      }
    },
    [onChangeProp]
  )
  const paddingLeft = ghost && icon ? 36 : ghost ? 0 : icon ? 36 : 12
  const paddingRight = ghost ? 0 : iconRight ? 36 : 12
  const fontSize = 14
  const fontWeight = 400
  const moreProps = {
    // consoleFunc,
    onChange,
    name,
    type,
    value,
    defaultValue,
    placeholder,
    disabled,
    autoFocus,
    style: {
      outlineRadius: '8',
      outlineOffset: ghost ? null : focus ? -1 : -1,
      borderRadius: 8,
      boxShadow: ghost ? null : `0px 1px 4px ${color('background2')}`,
      cursor: disabled ? 'not-allowed' : 'text',
      color: disabled ? color('text2:hover') : 'inherit',
      minHeight: ghost ? '' : 36,
      paddingLeft,
      border: ghost
        ? `0px solid transparent`
        : focused
        ? `1.5px solid ${color('accent')}`
        : `1px solid ${color('border')}`,
      paddingRight,
      width: '100%',
      fontSize,
      fontWeight,
      backgroundColor: bg
        ? color(hover && !disabled ? 'border' : 'border')
        : 'inherit',
    },
    inputRef,
    // ...otherProps,
  }
  return (
    <InputWrapper style={{ position: 'relative' }} {...props}>
      {/* <div> */}
      {renderOrCreateElement(props.icon, {
        style: {
          position: 'absolute',
          left: props.indent ? 24 : 12,
          top:
            props.label && props.description
              ? '77.5%'
              : props.label || props.description
              ? '72.5%'
              : '50%',
          transform: 'translate3d(0,-50%,0)',
          pointerEvents: 'none',
        },
      })}
      <Single
        style={{ ...moreProps.style, ...style }}
        type={type}
        onChange={onChange}
        {...props}
        value={value}
        // safari fix maybe it breaks smth
        onKeyDown={(e) => {
          // now you can remove the zero in input fields
          if (e.key === 'Backspace' && value === 0) {
            setValue('')
          }
          // for some reason pressing . in number input
          // changed the value to one
          if (e.key === '.' && type === 'number') {
            e.preventDefault()
          }
          props.onKeyDown?.(e)
        }}
        // style={props.style}
        // @ts-ignore
        // onFocus={() => setFocused(true)}
        // onBlur={() => setFocused(false)}
      />
      {type === 'number' ? (
        <div
          style={{
            position: 'absolute',
            right: 8,
            top: '70%',
            transform: 'translate3d(0,-50%,0)',
            display: 'flex',
            flexDirection: 'column',
            width: 15,
            height: 20,
          }}
        >
          <styled.div
            style={{
              border: `1px solid ${color('border')}`,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 10,
              '@media (hover: hover)': {
                '&:hover': {
                  backgroundColor: color('border'),
                },
              },
            }}
            onClick={() => {
              onChange({ target: { value: String(+value + 1) } })
            }}
          >
            <ChevronUpIcon size={9} strokeWidth={2.5} />
          </styled.div>
          <styled.div
            style={{
              border: `1px solid ${color('border')}`,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 10,
              '@media (hover: hover)': {
                '&:hover': {
                  backgroundColor: color('border'),
                },
              },
            }}
            onClick={() => {
              onChange({ target: { value: String(+value - 1) } })
            }}
          >
            <ChevronDownIcon size={9} strokeWidth={2.5} />
          </styled.div>
        </div>
      ) : null}
      {/* </div> */}
    </InputWrapper>
  )
}
