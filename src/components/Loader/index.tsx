import { colors } from '../../utils/colors.js'
import { styled } from 'inlines'

type LoaderProps = {
  value?: number
  color?: 'neutral' | 'red'
}

function Loader({ value, color = 'neutral' }: LoaderProps) {
  const infinite = typeof value !== 'number'

  if (!infinite && (value < 0 || value > 100)) {
    throw new Error('Value should be between 0 and 100')
  }

  if (infinite) {
    return (
      <svg fill="none" viewBox="0 0 100 100" style={{ width: 16, height: 16 }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              stopColor={color === 'red' ? colors.red100 : colors.neutral100}
              stopOpacity="0"
            />
            <stop
              offset="50%"
              stopColor={color === 'red' ? colors.red100 : colors.neutral100}
              stopOpacity="0.4"
            />
            <stop
              offset="100%"
              stopColor={color === 'red' ? colors.red100 : colors.neutral100}
              stopOpacity="1"
            />
          </linearGradient>
        </defs>
        <styled.circle
          cx={50}
          cy={50}
          r={45}
          style={{
            transformOrigin: '50px 50px',
            stroke: 'url(#gradient)',
            strokeWidth: 10,
            strokeDasharray: `${(2 / 3) * 100 * ((45 * 2 * Math.PI) / 100)} ${45 * 2 * Math.PI}`,
            strokeLinecap: 'round',
            '@keyframes': {
              '0%': {
                transform: 'rotate(270deg)',
                animationTimingFunction: 'ease-in',
              },
              '50%': {
                transform: 'rotate(90deg)',
                animationTimingFunction: 'ease-out',
              },
              to: {
                transform: 'rotate(-90deg)',
              },
            },
            animationIterationCount: 'infinite',
            animationDuration: '1s',
          }}
        />
      </svg>
    )
  }

  return (
    <svg fill="none" viewBox="0 0 100 100" style={{ width: 16, height: 16 }}>
      <circle
        cx={50}
        cy={50}
        r={45}
        style={{
          stroke: color === 'red' ? colors.red20 : colors.neutral20,
          strokeWidth: 10,
        }}
      />
      <circle
        cx={50}
        cy={50}
        r={45}
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '50px 50px',
          stroke: color === 'red' ? colors.red100 : colors.neutral100,
          strokeWidth: 10,
          strokeDasharray: `${value * ((45 * 2 * Math.PI) / 100)} ${45 * 2 * Math.PI}`,
          transition: 'all 250ms ease',
          strokeLinecap: 'round',
        }}
      />
    </svg>
  )
}

export { Loader }
export type { LoaderProps }
