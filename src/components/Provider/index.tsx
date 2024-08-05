import { ReactNode } from 'react'
import { ThemeProvider, ThemeProviderProps } from '../../hooks/useTheme.js'

type ProviderProps = {
  children: ReactNode
  forcedTheme: ThemeProviderProps['forcedTheme']
}

function Provider({ children, forcedTheme }: ProviderProps) {
  return <ThemeProvider forcedTheme={forcedTheme}>{children}</ThemeProvider>
}

export type { ProviderProps }
export { Provider }
