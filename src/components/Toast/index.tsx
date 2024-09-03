import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { Icon, IconProps } from '../Icon/index.js'
import { Button } from '../Button/index.js'
import { IconButton } from '../IconButton/index.js'
import { radius } from '../../utils/radius.js'
import { colors } from '../../utils/colors.js'
import { Text } from '../Text/index.js'
import { styled } from 'inlines'
import { shadows } from '../../utils/shadows.js'

type ToastFn = (
  message: Pick<ToastProps, 'message'>['message'],
  options?: Omit<ToastProps, 'message' | 'onDismiss'>,
) => void
type ToastContextProps = ToastFn

const ToastContext = createContext<ToastContextProps>(() => {})

type ToastProviderProps = {
  children: ReactNode
}

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<
    (ToastProps & {
      id: string
      visibility: 'entering' | 'visible' | 'leaving'
      height: number
    })[]
  >([])

  const toast = useCallback<ToastFn>((message, options) => {
    const id = crypto.randomUUID()
    setToasts((p) => [
      ...p,
      { id, message, visibility: 'entering', height: 0, ...options },
    ])
    setTimeout(() => {
      setToasts((p) =>
        p.map((e) => (e.id === id ? { ...e, visibility: 'visible' } : e)),
      )
    }, 250)

    if (options?.primaryButtonLabel && options?.secondaryButtonLabel) return

    setTimeout(() => {
      setToasts((p) =>
        p.map((e) => (e.id === id ? { ...e, visibility: 'leaving' } : e)),
      )
      setTimeout(() => {
        setToasts((p) => p.filter((e) => e.id !== id))
      }, 250)
    }, 5000)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {!!toasts.length && (
        <div
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            inset: 24,
          }}
        >
          {toasts.map((toast, index) => (
            <styled.div
              key={toast.id}
              ref={(el) => {
                if (el && toasts.find((e) => e.id === toast.id).height === 0) {
                  setToasts((p) =>
                    p.map((e) =>
                      e.id === toast.id
                        ? { ...e, height: el.getBoundingClientRect().height }
                        : e,
                    ),
                  )
                }
              }}
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'end',
                opacity:
                  toast.visibility === 'visible' && index > toasts.length - 6
                    ? 1
                    : 0,
                transition: 'all 250ms',
                transform: (() => {
                  if (toast.visibility === 'entering') {
                    return `translateY(100%)`
                  }

                  let heightOfToastsBelow = 0

                  for (let i = index; i < toasts.length - 1; i++) {
                    heightOfToastsBelow += toasts[i + 1].height + 8
                  }

                  if (toast.visibility === 'leaving') {
                    return `translateY(-${heightOfToastsBelow}px) translateX(120px)`
                  }

                  return `translateY(-${heightOfToastsBelow}px)`
                })(),
              }}
            >
              <Toast
                {...toast}
                onDismiss={() => {
                  setToasts((p) =>
                    p.map((e) =>
                      e.id === toast.id ? { ...e, visibility: 'leaving' } : e,
                    ),
                  )
                  setTimeout(() => {
                    setToasts((p) => p.filter((e) => e.id !== toast.id))
                  }, 250)
                }}
              />
            </styled.div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

function useToast() {
  return useContext(ToastContext)
}

type ToastProps = {
  message: string
  description?: string
  icon?: IconProps['variant']
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  onDismiss?: () => void
  primaryButtonLabel?: string
  secondaryButtonLabel?: string
}

function Toast({
  message,
  description,
  icon,
  primaryButtonLabel,
  onPrimaryClick,
  secondaryButtonLabel,
  onSecondaryClick,
  onDismiss,
}: ToastProps) {
  if (
    (onPrimaryClick && !primaryButtonLabel) ||
    (!onPrimaryClick && primaryButtonLabel)
  ) {
    throw new Error(
      'Toast: need to provide both onClick and label for primary button',
    )
  }
  if (
    (onSecondaryClick && !secondaryButtonLabel) ||
    (!onSecondaryClick && secondaryButtonLabel)
  ) {
    throw new Error(
      'Toast: need to provide both onClick and label for secondary button',
    )
  }

  return (
    <div
      style={{
        pointerEvents: 'all',
        display: 'inline-flex',
        width: 400,
        flexDirection: 'column',
        gap: 12,
        flexShrink: 0,
        padding: 16,
        borderRadius: radius[16],
        border: `1px solid ${colors.neutral20Adjusted}`,
        background: colors.neutralInverted100,
        boxShadow: shadows.popoverLarge,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: colors.neutral80,
          }}
        >
          {icon && <Icon variant={icon} />}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Text variant="display-medium" color="neutral80">
              {message}
            </Text>
            {description && (
              <Text variant="display-regular" color="neutral60">
                {description}
              </Text>
            )}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            gap: 12,
          }}
        >
          {((primaryButtonLabel && !secondaryButtonLabel) ||
            (!primaryButtonLabel && secondaryButtonLabel)) && (
            <>
              {primaryButtonLabel && (
                <Button
                  onClick={() => {
                    onPrimaryClick()
                    onDismiss?.()
                  }}
                >
                  {primaryButtonLabel}
                </Button>
              )}
              {secondaryButtonLabel && (
                <Button
                  variant="border"
                  onClick={() => {
                    onSecondaryClick()
                    onDismiss?.()
                  }}
                >
                  {secondaryButtonLabel}
                </Button>
              )}
            </>
          )}
          <IconButton onClick={onDismiss} icon="close" />
        </div>
      </div>
      {primaryButtonLabel && secondaryButtonLabel && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {icon && <div style={{ height: 24, width: 24 }} />}
          <Button
            onClick={() => {
              onPrimaryClick()
              onDismiss?.()
            }}
          >
            {primaryButtonLabel}
          </Button>
          <Button
            variant="border"
            onClick={() => {
              onSecondaryClick()
              onDismiss?.()
            }}
          >
            {secondaryButtonLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

export { ToastProvider, useToast }
export type { ToastProviderProps }
