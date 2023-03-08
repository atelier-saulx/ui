import React from 'react'

import { Code, Text, Button } from '~'

import { useRoute } from 'kabouter'

export const LocationHook = () => {
  const [location, setLocation] = useLocation()

  const codeExample = `
    import { useRoute } from 'kabouter'

    const [location, setLocation] = useLocation()

    <Text>location: {location}</Text>
    <Button onClick={() => setLocation('/')}>Set location</Button>
  `

  return (
    <div>
      <Code value={codeExample} space />
      <Text space="12px">location: {location}</Text>
      <Button onClick={() => setLocation('/')}>Set location</Button>
    </div>
  )
}
