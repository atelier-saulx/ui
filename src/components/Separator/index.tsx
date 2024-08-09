import { colors } from '../../utils/colors.js'

type SeparatorProps = {
  orientation?: 'horizontal' | 'vertical'
}

function Separator({ orientation = 'horizontal' }: SeparatorProps) {
  if (orientation === 'vertical') {
    return (
      <div style={{ height: '100%', padding: '4px 4px' }}>
        <div
          style={{ height: '100%', width: '1px', background: colors.neutral10 }}
        />
      </div>
    )
  }
  return (
    <div style={{ width: '100%', padding: '2px 8px' }}>
      <div style={{ height: 1, width: '100%', background: colors.neutral10 }} />
    </div>
  )
}

export { Separator }
export type { SeparatorProps }
