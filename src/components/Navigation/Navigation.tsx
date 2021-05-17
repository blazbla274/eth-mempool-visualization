import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { WAVES_PATHS, WAVES_TIMEOUT } from './constants'

const Container = styled.div`
  position: sticky;
  width: 100vw;
  height: 200px;
`

const Path = styled.path`
  transition: all ${WAVES_TIMEOUT}ms ease-in-out;
`

const Navigation = () => {
  const [waveIndex, setWaveIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveIndex(index => {
        const random = Math.floor(Math.random() * WAVES_PATHS.length)
        return Math.floor(random) !== index
          ? random
          : index + 1
      })
    }, WAVES_TIMEOUT)
    setWaveIndex(index => index + 1)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav>
      <Container>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <Path fill="#0099ff" fill-opacity="1" d={WAVES_PATHS[waveIndex % WAVES_PATHS.length]}/>
        </svg>
      </Container>
    </nav>
  )
}

export { Navigation }
