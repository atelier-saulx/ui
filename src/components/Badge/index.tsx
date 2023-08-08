import React, { CSSProperties, FC, ReactNode, FunctionComponent } from 'react'
import {
  border,
  color,
  renderOrCreateElement,
  Color,
  Icon,
  Text,
  styled,
  useCopyToClipboard,
  CheckIcon,
  Style,
} from '~'

type BadgeProps = {
  children: ReactNode
  style?: Style
  icon?: FunctionComponent<Icon> | ReactNode
  iconRight?: FunctionComponent<Icon> | ReactNode
  outline?: boolean
  color?: Color
  boxed?: boolean
  ghost?: boolean
  onClick?: ((e: MouseEvent) => void) | boolean
}

export const CopyBadge: FC<BadgeProps & { copyValue?: string | number }> = ({
  copyValue,
  ...props
}) => {
  const val: string | number =
    copyValue ?? (typeof props.children === 'string' ? props.children : '')
  const [copy, copyClick] = useCopyToClipboard(val)
  return (
    <Badge
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        copyClick()
      }}
      icon={copy ? CheckIcon : props.icon}
      {...props}
    />
  )
}

export const Badge: FC<BadgeProps> = ({
  children,
  icon,
  iconRight,
  style,
  outline,
  color: colorProp = 'text',
  onClick,
  boxed,
  ghost,
  ...props
}) => {
  return (
    <styled.div
      onClick={onClick}
      style={{
        minHeight: 24,
        transition: 'transform 0.15s',
        transform: 'scale(1)',
        cursor: onClick ? 'pointer' : null,
        padding: '0 8px',
        borderRadius: boxed ? 4 : 12,
        width: 'fit-content',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        color: color(colorProp, 'contrast', true),
        border: border(outline && 1, colorProp, 'border', true),
        backgroundColor: ghost ? 'transparent' : color(colorProp, true),
        '@media (hover: hover)': {
          '&:hover': onClick
            ? {
                backgroundColor: color(colorProp, 'hover', true),
              }
            : null,
        },
        ...style,
      }}
      {...props}
    >
      {icon && (
        <styled.div
          style={{
            marginRight: 8,
            minWidth: 10,
            maxWidth: '100%',
            height: 'auto',
          }}
        >
          {renderOrCreateElement(icon, { size: 10 })}
        </styled.div>
      )}
      <Text typography="caption500" color="inherit">
        {children}
      </Text>
      {iconRight && (
        <styled.div style={{ marginLeft: 8 }}>
          {renderOrCreateElement(iconRight, { size: 10 })}
        </styled.div>
      )}
    </styled.div>
  )
}
