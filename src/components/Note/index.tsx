import { ReactNode } from 'react'
import { Icon, IconProps } from '../Icon/index.js'
import { radius } from '../../utils/radius.js'
import { Text } from '../Text/index.js'
import { Color, colors } from '../../utils/colors.js'

type NoteProps = {
  title: string
  description?: string
  icon?: IconProps['variant']
  children?: ReactNode
  color?: 'neutral' | 'orange' | 'red' | 'green' | 'blue'
}

function Note({
  title,
  description,
  color = 'neutral',
  icon = 'error',
  children,
}: NoteProps) {
  return (
    <div
      style={{
        width: '100%',
        padding: 12,
        borderRadius: radius[8],
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        boxShadow: `inset 0 0 0 1px ${colors.neutral20Adjusted}`,

        ...(color === 'neutral' && {
          background: colors.neutral10Adjusted,
          color: colors.neutral80,
        }),
        ...(color === 'red' && {
          background: colors.red100,
          color: colors.white100,
        }),
        ...(color === 'orange' && {
          background: colors.orange100,
          color: colors.neutral100,
        }),
        ...(color === 'blue' && {
          background: colors.blue100,
          color: colors.white100,
        }),
        ...(color === 'green' && {
          background: colors.green100,
          color: colors.white100,
        }),
      }}
    >
      {icon && <Icon variant={icon} />}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Text
          variant="display-medium"
          color={
            {
              neutral: 'neutral80',
              red: 'white100',
              orange: 'neutral100',
              green: 'white100',
              blue: 'white100',
            }[color] as Color
          }
        >
          {title}
        </Text>
        {description && (
          <Text
            variant="display-regular"
            color={
              {
                neutral: 'neutral60',
                red: 'white80',
                orange: 'neutral80',
                green: 'white80',
                blue: 'white80',
              }[color] as Color
            }
          >
            {description}
          </Text>
        )}
      </div>
      {children && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export { Note }
export type { NoteProps }
