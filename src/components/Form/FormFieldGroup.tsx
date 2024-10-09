import { ReactNode } from 'react'
import { Text } from '../Text/index.js'
import { colors } from '../../utils/colors.js'
import { radius } from '../../utils/radius.js'

type FormFieldGroupProps = {
  label?: string
  children: ReactNode
  fullScreen?: boolean
}

function FormFieldGroup({ label, children, fullScreen }: FormFieldGroupProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        ...(fullScreen && {
          padding: 32,
          gap: 24,
          background: colors.neutralInverted100,
          border: `1px solid ${colors.neutral20Adjusted}`,
          borderRadius: radius[24],
        }),
      }}
    >
      {label && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Text variant="display-bold" color="neutral80">
            {label}
          </Text>
          {!fullScreen && (
            <div
              style={{ height: 1, width: '100%', background: colors.neutral10 }}
            />
          )}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {children}
      </div>
    </div>
  )
}

export { FormFieldGroup }
export type { FormFieldGroupProps }
