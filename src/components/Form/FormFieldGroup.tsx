import { ReactNode } from 'react'
import { Text } from '../Text/index.js'
import { colors } from '../../utils/colors.js'

type FormFieldGroupProps = {
  label?: string
  children: ReactNode
}

function FormFieldGroup({ label, children }: FormFieldGroupProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {label && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Text variant="display-bold" color="neutral80">
            {label}
          </Text>
          <div
            style={{ height: 1, width: '100%', background: colors.neutral10 }}
          />
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
