import { forwardRef, ReactNode } from 'react'
import * as Primitive from '@radix-ui/react-scroll-area'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { styled } from 'inlines'

type ScrollAreaProps = {
  children: ReactNode
  style?: React.CSSProperties
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, style }, ref) => {
    return (
      <Primitive.Root
        style={{ overflow: 'hidden', width: '100%', height: '100%' }}
      >
        <Primitive.Viewport
          ref={ref}
          style={{ width: '100%', height: '100%', ...style }}
        >
          {children}
        </Primitive.Viewport>
        <Primitive.Scrollbar forceMount orientation="vertical" asChild>
          <styled.div
            style={{
              userSelect: 'none',
              touchAction: 'none',
              display: 'flex',
              borderRadius: radius[8],
              background: 'transparent',
              width: 12,
              padding: 2,
              transition: 'opacity 100ms ease-out',
              zIndex: 10,
              "&[data-state='hidden']": {
                opacity: 0,
              },
            }}
          >
            <Primitive.Thumb asChild>
              <styled.div
                style={{
                  flex: 1,
                  background: colors.neutral60,
                  borderRadius: radius[8],
                  '&:hover': {
                    background: colors.neutral80,
                  },
                }}
              />
            </Primitive.Thumb>
          </styled.div>
        </Primitive.Scrollbar>
        <Primitive.Scrollbar forceMount asChild orientation="horizontal">
          <styled.div
            style={{
              userSelect: 'none',
              touchAction: 'none',
              display: 'flex',
              flexDirection: 'column',
              background: 'transparent',
              height: 12,
              padding: 2,
              zIndex: 10,
              "&[data-state='hidden']": {
                opacity: 0,
              },
            }}
          >
            <Primitive.Thumb asChild>
              <styled.div
                style={{
                  flex: 1,
                  background: colors.neutral60,
                  borderRadius: radius[8],
                  '&:hover': {
                    background: colors.neutral80,
                  },
                }}
              />
            </Primitive.Thumb>
          </styled.div>
        </Primitive.Scrollbar>
        <Primitive.Corner style={{ background: 'transparent' }} />
      </Primitive.Root>
    )
  },
)

export { ScrollArea }
export type { ScrollAreaProps }
