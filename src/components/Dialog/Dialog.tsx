import React, {
  forwardRef,
  ElementRef,
  FC,
  ComponentProps,
  ReactNode,
  Fragment,
  useRef,
  useState,
  useEffect,
} from 'react'
import { useDialog } from './useDialog'

import { styled, Style } from 'inlines'
import { Button } from '../Button/'
import { Text } from '../Text'
import { ScrollArea } from '../ScrollArea'
import { color } from '../../varsUtilities'

import { ButtonProps } from '../../components/types'

const Container = styled('div', {
  width: 632,
  maxHeight: 'calc(100vh - 30px)',
  maxWidth: 'calc(100vw - 30px)',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
  backgroundColor: color('background', 'default', 'surface'),
})

const ScrollBody = styled('div', {
  paddingTop: '16px',
  paddingLeft: '32px',
  paddingRight: '32px',
  '--dialogPadding': `32px`,
  '@media only screen and (max-width: 680px)': {
    '--dialogPadding': `16px`,
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  paddingBottom: '0px',
  width: '100%',
  '&>:last-child': {
    paddingBottom: 'var(--dialogPadding) !important',
  },
})

const StyledButtons = styled('div', {
  position: 'sticky',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  '@media only screen and (max-width: 680px)': {
    justifyContent: 'space-between',
  },
  paddingTop: 'var(--dialogPadding)',
  backgroundColor: color('background', 'default', 'surface'),
  paddingBottom: 'var(--dialogPadding)',
})

const ButtonsWithBorder = styled(StyledButtons, {
  borderTop: `1px solid ${color('border', 'default', 'strong')}`,
  marginTop: 48,
  paddingLeft: '32px',
  paddingRight: '32px',
  marginLeft: 'calc(-32px)',
  marginRight: 'calc(-39px)',
  '@media only screen and (max-width: 680px)': {
    paddingLeft: '16px',
    paddingRight: '16px',
    marginLeft: 'calc(-16px)',
    marginRight: 'calc(-16px)',
  },
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
})

const ButtonSpacer = styled('div', {
  width: 16,
})

const BodySpacer = styled('div', {
  // . height: 24,
  '&:first-child': {
    display: 'none',
  },
})

const Label = (props) => {
  return (
    <Text
      typography="subtitle600"
      {...props}
      style={{ marginBottom: 24, marginTop: 16, ...props.style }}
    />
  )
}

const Body = ({ children }) => {
  if (typeof children === 'string') {
    return <div>{children}</div>
  } else if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => (
          <Body key={index}>{child}</Body>
        ))}
      </>
    )
  } else {
    return (
      <>
        <BodySpacer />
        {children}
      </>
    )
  }
}

const Buttons = ({ children, border = null }) => {
  if (Array.isArray(children)) {
    children = children.map((child, index) => {
      return index ? (
        <Fragment key={index}>
          <ButtonSpacer />
          {child}
        </Fragment>
      ) : (
        child
      )
    })
  }
  return border ? (
    <ButtonsWithBorder>{children}</ButtonsWithBorder>
  ) : (
    <StyledButtons>{children}</StyledButtons>
  )
}

const Confirm: FC<
  Omit<ButtonProps, 'onClick'> & {
    onConfirm?: ((val?: any) => Promise<void>) | ((val?: any) => void)
  }
> = ({ children = 'OK', onConfirm, ...props }) => {
  const dialog = useDialog()

  const { current: myId } = useRef(dialog._id)

  const onClick = onConfirm
    ? async () => {
        if (!props.disabled && myId === dialog._id) {
          await onConfirm()
          dialog.close(myId)
        }
      }
    : () => {
        if (!props.disabled && myId === dialog._id) {
          dialog.close(myId)
        }
      }

  return (
    <Button
      //   onClick={onClick}
      //   keyboardShortcut="Enter"
      //   displayShortcut
      {...props}
    >
      {children}
    </Button>
  )
}

const Cancel: FC<
  Omit<ButtonProps, 'onClick'> & {
    onCancel?: (() => Promise<void>) | (() => void)
  }
> = ({ children = `Cancel`, onCancel = null, style = null, ...props }) => {
  const dialog = useDialog()
  const { current: myId } = useRef(dialog._id)

  const onClick = onCancel
    ? async () => {
        if (!props.disabled && myId === dialog._id) {
          await onCancel()
          dialog.close(myId)
        }
      }
    : () => {
        if (!props.disabled && myId === dialog._id) {
          dialog.close(myId)
        }
      }

  return (
    <Button
      onClick={onClick}
      //   keyboardShortcut="Esc"
      //   displayShortcut
      style={{
        ...style,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export interface DialogProps extends ComponentProps<typeof Container> {
  children?: ReactNode
  label?: string
  pure?: boolean
  style?: Style
}

export const Dialog = Object.assign(
  forwardRef<ElementRef<typeof Container>, DialogProps>(
    ({ children, label, style, pure, ...props }, forwardedRef) => {
      if (typeof children === 'string') {
        if (!label) {
          label = children
          children = null
        } else {
          children = <Body>{children}</Body>
        }
      }

      const [go, setgo] = useState(false)
      useEffect(() => {
        const x = requestAnimationFrame(() => {
          setgo(true)
        })
        return () => {
          cancelAnimationFrame(x)
        }
      }, [])

      return (
        <Container
          style={{
            transition: 'transform 0.15s, opacity 0.15s',
            opacity: go ? 1 : 0,
            transform: go ? 'scale(1)' : 'scale(0.9)',
            ...style,
          }}
          ref={forwardedRef}
          {...props}
        >
          {label && (
            <styled.div
              style={{
                padding: '24px 32px 8px 32px',
                '@media only screen and (max-width: 680px)': {
                  padding: '24px 16px 8px 16px',
                },
              }}
            >
              <Text size={18}>{label}</Text>
            </styled.div>
          )}
          {pure ? (
            children
          ) : (
            <ScrollArea style={{ overflowY: go ? null : 'hidden' }}>
              <ScrollBody>{children}</ScrollBody>
            </ScrollArea>
          )}
        </Container>
      )
    }
  ),
  {
    Label,
    Body,
    Buttons,
    Confirm,
    Cancel,
  }
)
