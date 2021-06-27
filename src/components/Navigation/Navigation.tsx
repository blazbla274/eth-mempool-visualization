import React from 'react'
import { Typography, TypographyTypeMap } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import styled from 'styled-components'

import { GasPrice } from './GasPrice'
import { WavesAnimation } from './WavesAnimation'

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 200px;
`

const PaddingBox = styled.div`
  padding: ${({ theme }) => theme.spacing(2)}px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`

const PositionedWavesAnimation = styled(WavesAnimation)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(4) - 2}px;
  left: 0;
`

const AppTitle = styled(Typography)`
  position: absolute;
  top: 0;
  left: 0;

  &.MuiTypography-root {
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
` as OverridableComponent<TypographyTypeMap<{}, "span">>

const PositionedGasPrice = styled(GasPrice)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`

const Navigation = () => (
  <nav>
    <Container>
      <PaddingBox />
      <PositionedWavesAnimation />
      <AppTitle component="h1" variant="h4">
        {process.env.REACT_APP_NAME}
      </AppTitle>
      <PositionedGasPrice />
    </Container>
  </nav>
)

export { Navigation }
