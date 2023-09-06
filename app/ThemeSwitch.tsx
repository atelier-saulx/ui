import React from 'react'
import { Button, IconBlock, IconPlaceholder, useTooltip } from '../src'
import { useTheme } from '../src/hooks/useTheme'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const toolTipThemeBtn = useTooltip('Change theme', 'bottom-right')

  return (
    <Button
      color="system"
      icon={theme === 'light' ? <IconPlaceholder /> : <IconBlock />}
      size="small"
      style={{ marginBottom: 16 }}
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
      {...toolTipThemeBtn}
    />
  )
}
