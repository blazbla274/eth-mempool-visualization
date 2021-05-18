import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { WAVES_PATHS, WAVES_TIMEOUT } from './constants'

const Svg = styled.svg`
  transform:rotate(180deg)
`

const Path = styled.path`
  fill: ${({ theme }) => theme.palette.primary.main};
  transition: all ${WAVES_TIMEOUT}ms ease-in-out;
`

const WavesAnimation = ({ className }: { className?: string }): JSX.Element => {
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
    <Svg
      viewBox="0 0 1440 110"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <Path fill-opacity="1" d={WAVES_PATHS[waveIndex % WAVES_PATHS.length]}/>
    </Svg>
  )
}

export { WavesAnimation }
