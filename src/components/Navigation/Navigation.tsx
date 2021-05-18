import React, { useEffect, useState } from 'react'
import { Typography, TypographyTypeMap } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import styled from 'styled-components'

import { WAVES_PATHS, WAVES_TIMEOUT } from './constants'
import { GasPrices } from './GasPrices'

const Container = styled.div`
  position: sticky;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 200px;
`

const Svg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  transform:rotate(180deg)
`

const Path = styled.path`
  fill: ${({ theme }) => theme.palette.primary.main};
  transition: all ${WAVES_TIMEOUT}ms ease-in-out;
`

const AppTitle = styled(Typography)`
  position: relative;

  &.MuiTypography-root {
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
` as OverridableComponent<TypographyTypeMap<{}, "span">>

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
        <Svg viewBox="0 0 1440 110" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <Path fill-opacity="1" d={WAVES_PATHS[waveIndex % WAVES_PATHS.length]}/>
        </Svg>
        <AppTitle component="h1" variant="h4" >{process.env.REACT_APP_NAME}</AppTitle>
        <GasPrices />
        <div />
      </Container>
    </nav>
  )
}

export { Navigation }
