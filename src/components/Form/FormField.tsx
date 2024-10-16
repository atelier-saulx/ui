import { ReactNode } from 'react'
import { Text } from '../Text/index.js'
import { colors } from '../../utils/colors.js'
import { Icon } from '../Icon/index.js'
import { Note, NoteProps } from '../Note/index.js'

type FormFieldProps = {
  label?: string
  description?: string
  error?: string
  children: ReactNode
  horizontal?: boolean
  note?: Pick<NoteProps, 'title' | 'description'>
}

function FormField({
  children,
  label,
  description,
  error,
  horizontal = false,
  note,
}: FormFieldProps) {
  if (horizontal) {
    return (
      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          gap: 16,
          minHeight: 36,
        }}
      >
        <div style={{ width: 160, paddingTop: 9.5 }}>
          <Text variant="display-regular" color="neutral60">
            {label}
          </Text>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            alignItems: 'start',
            justifyContent: 'center',
          }}
        >
          {children}
          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                color: colors.red100,
              }}
            >
              <Icon variant="error-filled" />
              <Text color="inherit" variant="display-medium">
                {error}
              </Text>
            </div>
          )}
          {description && (
            <Text variant="display-regular" color="neutral60">
              {description}
            </Text>
          )}
          {note && <Note {...note} />}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: 8,
      }}
    >
      {label && (
        <Text variant="display-regular" color="neutral60">
          {label}
        </Text>
      )}
      {children}
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            color: colors.red100,
          }}
        >
          <Icon variant="error-filled" />
          <Text color="inherit" variant="display-medium">
            {error}
          </Text>
        </div>
      )}
      {description && (
        <Text variant="display-regular" color="neutral60">
          {description}
        </Text>
      )}
      {note && <Note {...note} />}
    </div>
  )
}

export { FormField }
export type { FormFieldProps }
