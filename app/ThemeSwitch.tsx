import React from 'react'
import { Button, IconEye, Tooltip } from '../src'
import { useTheme } from '../src/hooks/useTheme'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <Tooltip text="Change theme">
      <Button
        color="system"
        icon={<IconEye />}
        size="small"
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        }}
      />
    </Tooltip>
  )
}
