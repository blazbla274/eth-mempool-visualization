import React from 'react'

import { AppProvider } from 'providers/AppProvider'
import { Navigation } from 'components/Navigation/Navigation'
import { BlockBuildingStage } from 'components/BlockBuildingStage/BlockBuildingStage'
import { BannerHub } from 'components/BannersHub/BannerHub'

const App = () => {
  return (
    <AppProvider>
      <Navigation />
      <BannerHub />
      <BlockBuildingStage />
    </AppProvider>
  )
}

export default App
