import React from 'react'

import { AppProvider } from 'providers/AppProvider'
import { Navigation } from 'components/Navigation/Navigation'
import { PendingTransactions } from 'components/Navigation/PendingTransactions'
import { BannerHub } from 'components/BannersHub/BannerHub'

const App = () => {
  return (
    <AppProvider>
      <Navigation />
      <BannerHub />
      <PendingTransactions />
    </AppProvider>
  )
}

export default App
