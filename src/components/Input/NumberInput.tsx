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
  } = props
  const [focused] = useState(false)
  const [value = '', setValue] = usePropState(valueProp, noInterrupt && focused)
  const onChange = useCallback(
    (e: { target: { value: string } }) => {
      const newValue = transform ? transform(e.target.value) : e.target.value
      setValue(+e.target.value)
      // @ts-ignore
      onChangeProp?.(+newValue)
    },
    [onChangeProp]
  )

  return (
    // <InputWrapper style={style} {...props}>
    <div>
      <Single
        type={type}
        {...props}
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
        style={props.style}
        // @ts-ignore
        // onFocus={() => setFocused(true)}
        // onBlur={() => setFocused(false)}
      />
      {type === 'number' ? (
        <div
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
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
            {renderOrCreateElement(props.icon, {
              style: {
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translate3d(0,-50%,0)',
                pointerEvents: 'none',
              },
            })}
          </styled.div>
        </div>
      ) : null}
    </div>
  )
}
