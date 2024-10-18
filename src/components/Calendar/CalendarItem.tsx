import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'
import { Icon } from '../Icon/index.js'
import { Text } from '../Text/index.js'
import { styled } from 'inlines'

type CalendarItemProps = {
  title?: string
  description?: string
  color?: 'neutral' | 'green' | 'blue' | 'orange' | 'red'
  position?: 'start' | 'middle' | 'end'
  repeating?: boolean
  onClick?: () => void
}

function CalendarItem({
  title,
  description,
  color = 'neutral',
  position,
  repeating,
  onClick,
}: CalendarItemProps) {
  return (
    <styled.div
      style={{
        flexShrink: 0,
        display: 'flex',
        minWidth: 0,
        alignItems: 'center',
        gap: 4,
        padding: '0px 6px',
        height: description ? 40 : 24,
        ...(!position && {
          borderRadius: radius[8],
        }),
        ...(position === 'start' && {
          borderTopLeftRadius: radius[8],
          borderBottomLeftRadius: radius[8],
        }),
        ...(position === 'end' && {
          borderTopRightRadius: radius[8],
          borderBottomRightRadius: radius[8],
        }),
        ...(color === 'neutral' && {
          background: colors.neutral5,
          color: colors.neutral80,
        }),
        ...(color === 'red' && {
          background: colors.red10,
          color: colors.red100,
        }),
        ...(color === 'green' && {
          background: colors.green10,
          color: colors.green100,
        }),
        ...(color === 'blue' && {
          background: colors.blue10,
          color: colors.blue100,
        }),
        ...(color === 'orange' && {
          background: colors.orange10,
          color: colors.orange100,
        }),
        ...(onClick && {
          cursor: 'pointer',
          '&:hover, &:active': {
            ...(color === 'neutral' && {
              background: colors.neutral10,
            }),
            ...(color === 'red' && {
              background: colors.red20,
            }),
            ...(color === 'green' && {
              background: colors.green20,
            }),
            ...(color === 'blue' && {
              background: colors.blue20,
            }),
            ...(color === 'orange' && {
              background: colors.orange20,
            }),
          },
        }),
      }}
      onClick={onClick}
    >
      {(!position || position === 'start') && repeating && (
        <Icon variant="repeat" size="small" />
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minWidth: 0,
        }}
      >
        {(!position || position === 'start') && (
          <>
            {title && (
              <Text singleLine variant="subtext-medium" color="inherit">
                {title}
              </Text>
            )}
            {description && (
              <Text singleLine variant="subtext-medium" color={`${color}60`}>
                {description}
              </Text>
            )}
          </>
        )}
      </div>
    </styled.div>
  )
}

export { CalendarItem }
export type { CalendarItemProps }
