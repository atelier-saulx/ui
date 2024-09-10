import {
  FloatingFocusManager,
  FloatingOverlay,
  useFloating,
  useTransitionStyles,
} from '@floating-ui/react'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { shadows } from '../../utils/shadows.js'
import { Text } from '../Text/index.js'
import { Button } from '../Button/index.js'

type DialogFn = (dialog: Omit<DialogProps, 'onDismiss'>) => void
const DialogContext = createContext<DialogFn>(() => {})

type DialogProviderProps = {
  children: ReactNode
}

function DialogProvider({ children }: DialogProviderProps) {
  const [currentDialog, setCurrentDialog] = useState<Omit<
    DialogProps,
    'onDismiss'
  > | null>(null)

  const dialog = useCallback<DialogFn>((dialog) => {
    setCurrentDialog(dialog)
  }, [])

  return (
    <DialogContext.Provider value={dialog}>
      {children}
      {currentDialog && (
        <Dialog
          {...currentDialog}
          onDismiss={() => {
            setCurrentDialog(null)
          }}
        />
      )}
    </DialogContext.Provider>
  )
}

type DialogProps = {
  title: string
  description?: string
  dismissButtonLabel: string
  actionButtonLabel?: string
  onDismiss: () => void
  onAction?: () => void
  color?: 'neutral' | 'red'
}

function Dialog({
  title,
  description,
  dismissButtonLabel,
  actionButtonLabel,
  onDismiss,
  onAction,
  color = 'neutral',
}: DialogProps) {
  if ((actionButtonLabel && !onAction) || (onAction && !actionButtonLabel)) {
    throw new Error('Dialog: provide both actionButtonLabel and onAction')
  }

  const { refs, context } = useFloating({
    open: true,
  })
  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 250,
    initial: {
      opacity: 0,
      transform: 'scale(0.92)',
      transitionTimingFunction: 'ease-out',
    },
    close: {
      opacity: 0,
      transform: 'scale(0.92)',
      transitionTimingFunction: 'ease-in',
    },
  })
  const { styles: overlayStyles } = useTransitionStyles(context, {
    duration: 250,
    initial: {
      opacity: 0,
      transitionTimingFunction: 'ease-out',
    },
    close: {
      opacity: 0,
      transitionTimingFunction: 'ease-in',
    },
  })

  if (!isMounted) return null

  return (
    <FloatingOverlay
      lockScroll
      style={{
        background: colors.black60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        ...overlayStyles,
      }}
    >
      <FloatingFocusManager context={context}>
        <div
          ref={refs.setFloating}
          style={{
            position: 'relative',
            width: 360,
            padding: 24,
            borderRadius: radius[24],
            background: colors.neutralInverted100,
            boxShadow: shadows.popoverLarge,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 16,
            outline: 'none',
            ...styles,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: colors.neutral10Background,
              borderRadius: radius[24],
              border: `1px solid ${colors.neutral10}`,
            }}
          />
          <Text variant="subheading-bold" color="neutral100" align="center">
            {title}
          </Text>
          <Text variant="display-regular" color="neutral60" align="center">
            {description}
          </Text>
          <div
            style={{
              display: 'flex',
              gap: 16,
            }}
          >
            <Button
              width="full"
              keyHint="Esc"
              keyHintPlacement="none"
              variant="border"
              onClick={onDismiss}
            >
              {dismissButtonLabel}
            </Button>
            {actionButtonLabel && (
              <Button
                width="full"
                keyHint="Enter"
                keyHintPlacement="none"
                color={color}
                onClick={() => {
                  onAction()
                  onDismiss()
                }}
              >
                {actionButtonLabel}
              </Button>
            )}
          </div>
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  )
}

function useDialog() {
  return useContext(DialogContext)
}

export { useDialog, DialogProvider }
export type { DialogProviderProps }
