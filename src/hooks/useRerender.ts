import { useCallback, useState } from 'react'

export function useRerender() {
  const [, setState] = useState<Record<string, never>>()

  const rerender = useCallback(() => {
    setState({})
  }, [])

  return rerender
}
