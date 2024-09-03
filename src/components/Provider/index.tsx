import { ReactNode } from 'react'
import { ThemeProvider, ThemeProviderProps } from '../../hooks/useTheme.js'
import { ToastProvider } from '../Toast/index.js'
import { DialogProvider } from '../Dialog/index.js'

type ProviderProps = {
  children: ReactNode
  forcedTheme: ThemeProviderProps['forcedTheme']
}

function Provider({ children, forcedTheme }: ProviderProps) {
  return (
    <ThemeProvider forcedTheme={forcedTheme}>
      <ToastProvider>
        <DialogProvider>{children}</DialogProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export type { ProviderProps }
export { Provider }
