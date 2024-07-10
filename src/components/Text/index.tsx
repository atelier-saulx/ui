import {
  COLORS,
  Color,
  ColorSwatch,
  color,
  colorSwatch,
} from '../../utils/colors.js'

type TextProps = {
  children: string
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
  color?: 'inherit' | Color | ColorSwatch
}

function Text({
  children,
  variant = 'display-regular',
  color: colorProp = 'neutral',
  align = 'left',
}: TextProps) {
  return (
    <div
      style={{
        textAlign: align,
        overflowWrap: 'break-word',
        color:
          colorProp === 'inherit'
            ? 'inherit'
            : COLORS.includes(colorProp as Color)
              ? color(colorProp as Color)
              : colorSwatch(colorProp as ColorSwatch),
        fontFamily: 'var(--font-sans)',
        lineHeight: 1,
        letterSpacing: 'normal',
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
