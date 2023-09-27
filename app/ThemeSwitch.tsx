import React from 'react'
import { IconEye, Tooltip } from '../src'
import { useTheme } from '../src/hooks/useTheme'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <Tooltip text="Change theme">
      <IconEye
        color="brand"
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light')
        }}
      />
    </Tooltip>
  )
}
