import React from 'react'
import { Button, IconBlock, IconEye, useTooltip } from '../src'
import { useTheme } from '../src/hooks/useTheme'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const toolTipThemeBtn = useTooltip('Change theme', 'bottom-right')

  return (
    <IconEye
      color="brand"
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    />
  )
}
