import { Loader } from './index.js'
import React, { useEffect, useState } from 'react'

export default {
  title: 'Quarks/Loader',
  component: Loader,
}

export const Infinite = {
  args: {},
}

export const Progressive = () => {
  const [percentage, setPercentage] = useState(0)
  const [hitMax, setHitMax] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercentage((p) => {
        if (hitMax) return p

        let n = p + Math.random() * 25

        if (n >= 100) {
          setHitMax(true)
          setTimeout(() => {
            setPercentage(0)
            setHitMax(false)
          }, 500)

          return 100
        }

        return n
      })
    }, 500)

    return () => clearInterval(intervalId)
  }, [hitMax])

  return <Loader value={percentage} />
}

export const InfiniteRed = {
  args: {
    color: 'red',
  },
}

export const ProgressiveRed = () => {
  const [percentage, setPercentage] = useState(0)
  const [hitMax, setHitMax] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPercentage((p) => {
        if (hitMax) return p

        let n = p + Math.random() * 25

        if (n >= 100) {
          setHitMax(true)
          setTimeout(() => {
            setPercentage(0)
            setHitMax(false)
          }, 500)

          return 100
        }

        return n
      })
    }, 500)

    return () => clearInterval(intervalId)
  }, [hitMax])

  return <Loader color="red" value={percentage} />
}
