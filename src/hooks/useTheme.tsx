import { useState, useEffect, createContext, useContext } from 'react'

const LOCAL_STORAGE_KEY = 'based-ui-theme'
const DEFAULT_THEME: Theme = 'light'
const ATTRIBUTE_NAME = 'data-theme'
// This script is necessary because we want to set the data-theme attribute before the first render
// so that light/dark does not flash
// It should be placed somewhere in the body of the document, since it's sync it will stop the document parsing and so a render won't happen which is exactly what we are looking for
export const THEME_PREVENT_FLASH_SCRIPT_SRC = `<script>!function(){try{var t=localStorage.getItem("${LOCAL_STORAGE_KEY}");document.documentElement.setAttribute("${ATTRIBUTE_NAME}",null!=t?t:"${DEFAULT_THEME}")}catch(t){}}();</script>`

type Theme = 'light' | 'dark'

type UseThemeProps = {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const defaultContext = {
  setTheme: () => {},
  theme: DEFAULT_THEME,
}

const ThemeContext = createContext<UseThemeProps>(defaultContext)

export function useTheme() {
  return useContext(ThemeContext)
}

export type ThemeProviderProps = {
  children: React.ReactNode
  forcedTheme?: Theme // needed for storybook, where we don't control the theme switcher button
}

export function ThemeProvider({ children, forcedTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState(() => {
    let theme

    try {
      theme = localStorage.getItem(LOCAL_STORAGE_KEY)
    } catch {}

    return forcedTheme ?? ((theme ?? DEFAULT_THEME) as Theme)
  })

  useEffect(() => {
    document.documentElement.setAttribute(ATTRIBUTE_NAME, forcedTheme ?? theme)

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, forcedTheme ?? theme)
    } catch {}
  }, [theme, forcedTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
