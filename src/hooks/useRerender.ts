import { useCallback, useState } from 'react'

export function useRerender() {
  const [, setState] = useState({})

  const rerender = useCallback(() => {
    setState({})
  }, [])

  return rerender
}
