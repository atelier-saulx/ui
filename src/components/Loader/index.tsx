import { colors } from '../../utils/colors.js'
import { styled } from 'inlines'

type LoaderProps = {
  value?: number
  color?: 'neutral' | 'red' | 'inverted'
}

function Loader({ value, color = 'neutral' }: LoaderProps) {
  const infinite = typeof value !== 'number'

  if (!infinite && (value < 0 || value > 100)) {
    throw new Error('Value should be between 0 and 100')
  }

  if (infinite) {
    return (
      <div
        style={{
          pointerEvents: 'none',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 24,
          width: 24,
        }}
      >
        <svg
          fill="none"
          viewBox="0 0 100 100"
          style={{ width: 16, height: 16 }}
        >
          <defs>
            <linearGradient
              id="gradient-neutral"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.neutral100} stopOpacity="0" />
              <stop
                offset="50%"
                stopColor={colors.neutral100}
                stopOpacity="0.4"
              />
              <stop
                offset="100%"
                stopColor={colors.neutral100}
                stopOpacity="1"
              />
            </linearGradient>
            <linearGradient
              id="gradient-red"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={colors.red100} stopOpacity="0" />
              <stop offset="50%" stopColor={colors.red100} stopOpacity="0.4" />
              <stop offset="100%" stopColor={colors.red100} stopOpacity="1" />
            </linearGradient>
            <linearGradient
              id="gradient-inverted"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={colors.neutralInverted100}
                stopOpacity="0"
              />
              <stop
                offset="50%"
                stopColor={colors.neutralInverted100}
                stopOpacity="0.4"
              />
              <stop
                offset="100%"
                stopColor={colors.neutralInverted100}
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
              stroke: `url(#gradient-${color})`,
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
      </div>
    )
  }

  return (
    <div
      style={{
        pointerEvents: 'none',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
        width: 24,
      }}
    >
      <svg fill="none" viewBox="0 0 100 100" style={{ width: 16, height: 16 }}>
        <circle
          cx={50}
          cy={50}
          r={45}
          style={{
            stroke:
              color === 'inverted'
                ? colors.neutralInverted20
                : color === 'red'
                  ? colors.red20
                  : colors.neutral20,
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
            stroke:
              color === 'inverted'
                ? colors.neutralInverted100
                : color === 'red'
                  ? colors.red100
                  : colors.neutral100,
            strokeWidth: 10,
            strokeDasharray: `${value * ((45 * 2 * Math.PI) / 100)} ${45 * 2 * Math.PI}`,
            transition: 'all 250ms ease',
            strokeLinecap: 'round',
          }}
        />
      </svg>
    </div>
  )
}

export { Loader }
export type { LoaderProps }
