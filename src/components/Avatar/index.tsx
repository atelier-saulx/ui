import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'

type AvatarProps = {
  src: string
  color?: 'neutral' | 'inverted' | 'red' | 'orange' | 'blue' | 'green'
  size?: 'regular' | 'small'
}

function Avatar({ src, color, size = 'regular' }: AvatarProps) {
  if (!color) {
    return (
      <div
        style={{
          flexShrink: 0,
          width: size === 'small' ? 24 : 32,
          height: size === 'small' ? 24 : 32,
          position: 'relative',
        }}
      >
        <img
          style={{
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: radius.full,
            inset: 0,
          }}
          src={src}
        />
        <div
          style={{
            position: 'absolute',
            border: `1px solid ${colors.neutral20Adjusted}`,
            width: '100%',
            height: '100%',
            borderRadius: radius.full,
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        flexShrink: 0,
        width: size === 'small' ? 24 : 32,
        height: size === 'small' ? 24 : 32,
        position: 'relative',
        borderRadius: radius.full,
        ...(color === 'neutral' && {
          border: `2px solid ${colors.neutral100}`,
        }),
        ...(color === 'inverted' && {
          border: `2px solid ${colors.neutralInverted100}`,
        }),
        ...(color === 'red' && {
          border: `2px solid ${colors.red100}`,
        }),
        ...(color === 'orange' && {
          border: `2px solid ${colors.orange100}`,
        }),
        ...(color === 'blue' && {
          border: `2px solid ${colors.blue100}`,
        }),
        ...(color === 'green' && {
          border: `2px solid ${colors.green100}`,
        }),
      }}
    >
      <div
        style={{
          objectFit: 'cover',
          position: 'absolute',
          width: 32 - 4 * 2,
          height: 32 - 4 * 2,
          borderRadius: radius.full,
          top: 2,
          left: 2,
          overflow: 'hidden',
        }}
      >
        <img
          style={{
            objectFit: 'cover',
            position: 'absolute',
            width: 32,
            height: 32,
            left: -4,
            top: -4,
            borderRadius: radius.full,
          }}
          src={src}
        />
      </div>
    </div>
  )
}

export { Avatar }
export type { AvatarProps }
