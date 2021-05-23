import React from 'react'

import { AppProvider } from 'providers/AppProvider'
import { Navigation } from 'components/Navigation/Navigation'
import { PendingTransactions } from 'components/Navigation/PendingTransactions'

const App = () => {
  return (
    <AppProvider>
      <Navigation />
      <PendingTransactions />
    </AppProvider>
  )
}

export default App
