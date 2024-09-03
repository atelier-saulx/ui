import { ReactNode } from 'react'
import { ThemeProvider, ThemeProviderProps } from '../../hooks/useTheme.js'
import { ToastProvider } from '../Toast/index.js'

type ProviderProps = {
  children: ReactNode
  forcedTheme: ThemeProviderProps['forcedTheme']
}

function Provider({ children, forcedTheme }: ProviderProps) {
  return (
    <ThemeProvider forcedTheme={forcedTheme}>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  )
}

export type { ProviderProps }
export { Provider }
