import { useEffect } from 'react'
import { useLocation as useWouterLocation } from 'wouter'
import { useUpdate } from './useUpdate'

export const parseHref = (href = '/') => {
  if (href !== '/' && href[href.length - 1] === '/') {
    href = href.slice(0, -1)
  }

  const { search } = location

  if (search) {
    const i = href.indexOf('?')
    if (i !== -1) {
      const a = new URLSearchParams(search)
      const b = new URLSearchParams(href.substring(i))

      b.forEach((value, key) => {
        a.set(key, value)
      })
      href = `${href.substring(0, i)}?${a.toString()}`
    } else {
      href = `${href}${search}`
    }
  }

  return href
}

// TODO add hash and query based routing here
// https://github.com/molefrog/wouter#uselocation-hook-working-with-the-history

export const useLocation = (): [string, (href: string) => void] => {
  const [location, setLocation] = useWouterLocation()

  // add this for hash change?
  const update = useUpdate()
  useEffect(() => {
    // TODO optimize!
    const l = () => update()
    window.addEventListener('hashchange', l)
    return () => window.removeEventListener('hashchange', l)
  }, [])

  return [
    location,
    (href) => {
      const i = href.indexOf('#')
      const fireHashChange =
        i !== -1 && href.substring(i) !== window.location.hash
      setLocation(parseHref(href))
      if (fireHashChange) {
        dispatchEvent(new HashChangeEvent('hashchange'))
      }
    },
  ]
}
