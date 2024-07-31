import { colors } from '../../utils/colors.js'

type SeparatorProps = {}

function Separator({}: SeparatorProps) {
  return (
    <div style={{ width: '100%', padding: '2px 8px' }}>
      <div style={{ height: 1, width: '100%', background: colors.neutral10 }} />
    </div>
  )
}

export { Separator }
export type { SeparatorProps }
