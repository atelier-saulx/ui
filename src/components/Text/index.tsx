import { ReactNode } from 'react'
import { Color, colors } from '../../utils/colors.js'

type TextProps = {
  children: ReactNode
  variant?:
    | 'display-regular'
    | 'display-medium'
    | 'display-bold'
    | 'subheading-regular'
    | 'subheading-medium'
    | 'subheading-bold'
    | 'subtext-regular'
    | 'subtext-medium'
    | 'subtext-bold'
  align?: 'left' | 'center' | 'right'
  color?: 'inherit' | Color
  maxWidth?: number
}

function Text({
  children,
  variant = 'display-regular',
  color: colorProp = 'neutral100',
  align = 'left',
  maxWidth,
}: TextProps) {
  return (
    <div
      style={{
        textAlign: align,
        color: colorProp === 'inherit' ? 'inherit' : colors[colorProp],
        lineHeight: 'normal',
        letterSpacing: 'normal',
        overflowWrap: 'break-word',
        ...(maxWidth && {
          maxWidth: maxWidth,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }),
        ...(variant === 'display-regular' && {
          fontSize: 14,
          fontWeight: 400,
        }),
        ...(variant === 'display-medium' && {
          fontSize: 14,
          fontWeight: 500,
        }),
        ...(variant === 'display-bold' && {
          fontSize: 14,
          fontWeight: 700,
        }),
        ...(variant === 'subheading-regular' && {
          fontSize: 22,
          fontWeight: 300,
        }),
        ...(variant === 'subheading-medium' && {
          fontSize: 22,
          fontWeight: 500,
        }),
        ...(variant === 'subheading-bold' && {
          fontSize: 22,
          fontWeight: 800,
        }),
        ...(variant === 'subtext-regular' && {
          fontSize: 12,
          fontWeight: 400,
        }),
        ...(variant === 'subtext-medium' && {
          fontSize: 12,
          fontWeight: 500,
        }),
        ...(variant === 'subtext-bold' && {
          fontSize: 12,
          fontWeight: 700,
        }),
      }}
    >
      {children}
    </div>
  )
}

export type { TextProps }
export { Text }
