import React from 'react'
import styled from 'styled-components'

import { AppProvider } from 'providers/AppProvider'
import { Navigation } from 'components/Navigation/Navigation'
import { BlockBuildingStage } from 'components/BlockBuildingStage/BlockBuildingStage'
import { BannerHub } from 'components/BannersHub/BannerHub'
import background from 'assets/background.png'

const Container = styled.div`
  background-image: url(${background});
  background-size: cover;
  min-height: 100vh;
`

const App = () => {
  return (
    <AppProvider>
      <Container>
        <Navigation />
        <BannerHub />
        <BlockBuildingStage />
      </Container>
    </AppProvider>
  )
}

export default App
