import { ReactNode } from 'react'
import { KeyboardEventProvider } from '../../hooks/useHadKeyboardEvent.js'
import { ThemeProvider, ThemeProviderProps } from '../../hooks/useTheme.js'

type ProviderProps = {
  children: ReactNode
  forcedTheme: ThemeProviderProps['forcedTheme']
}

function Provider({ children, forcedTheme }: ProviderProps) {
  return (
    <ThemeProvider forcedTheme={forcedTheme}>
      <KeyboardEventProvider>{children}</KeyboardEventProvider>
    </ThemeProvider>
  )
}

export type { ProviderProps }
export { Provider }
