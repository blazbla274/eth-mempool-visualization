import React from 'react'

import { AppProvider } from 'providers/AppProvider'
import { Navigation } from 'components/Navigation/Navigation'

function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  )
}

export default App
