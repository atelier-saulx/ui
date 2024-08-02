import { cloneElement, ReactElement, ReactNode, useState } from 'react'
import { KeyHint, KeyHintProps } from '../KeyHint/index.js'
import {
  autoPlacement,
  autoUpdate,
  FloatingPortal,
  offset,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'
import { Text } from '../Text/index.js'
import { colors } from '../../utils/colors.js'
import { shadows } from '../../utils/shadows.js'
import { radius } from '../../utils/radius.js'

type TooltipProps = {
  children: ReactElement
  value?: string
  keyHint?: KeyHintProps['hint']
}

function Tooltip({ children, value, keyHint }: TooltipProps) {
  const [open, setOpen] = useState(false)

  if (!value && !keyHint) {
    throw new Error('Tooltip requires either value or keyHint to be provided')
  }

  const { context, floatingStyles, refs, placement } = useFloating({
    placement: 'bottom',
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      autoPlacement({
        allowedPlacements: [
          'bottom',
          'top',
          'bottom-start',
          'bottom-end',
          'top-start',
          'top-end',
        ],
      }),
    ],
  })

  const hover = useHover(context, { move: false })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
  ])
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 50,
    initial: {
      transform: `scale(0.9) translateY(${placement.startsWith('top') ? 8 : -8}px`,
      opacity: 0,
    },
    open: {
      opacity: 1,
      transform: `scale(1) translateY(0px)`,
    },
    close: {
      transform: `scale(0.9) translateY(${placement.startsWith('top') ? 8 : -8}px)`,
      opacity: 0,
    },
  })

  return (
    <>
      {cloneElement(children, {
        ...getReferenceProps({
          ref: refs.setReference,
          ...children.props,
        }),
      })}
      {isMounted && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{ ...floatingStyles }}
          >
            <div
              style={{
                background: colors.neutralInverted100,
                border: `1px solid  ${colors.neutral20Adjusted}`,
                boxShadow: shadows.popoverSmall,
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: radius[8],
                gap: 4,
                height: 28,
                padding: keyHint ? '0 6px 0 8px' : '0 8px',
                transitionTimingFunction: 'ease-in-out',
                ...transitionStyles,
              }}
            >
              <Text color="neutral100">{value}</Text>
              {keyHint && <KeyHint onTrigger={() => {}} hint={keyHint} />}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  )
}

export { Tooltip }
export type { TooltipProps }
