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

const ViewerParagraph = styled.p`
  margin: 0;
  font-size: 18px;
`

const PositionedGasPrice = styled(GasPrice)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`

const UnderWave = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border: 3px solid white;
  box-shadow: 0px 4px 4px 2px rgba(0,0,0,0.35);
`

const GasPriceUnderWave = styled(UnderWave)`
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 68px;
`

const AppTitleUnderWave = styled(UnderWave)`
  width: 100px;
  height: 62px;
  border-left: 0px;
`

const Navigation = () => (
  <nav>
    <Container>
      <PaddingBox />
      <GasPriceUnderWave />
      <AppTitleUnderWave />
      <PositionedWavesAnimation />
      <AppTitle component="h1" variant="h4">
        ETH
        <ViewerParagraph>VIEWER</ViewerParagraph>
      </AppTitle>
      <PositionedGasPrice />
    </Container>
  </nav>
)

export { Navigation }
