import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { combineProviders } from 'react-combine-providers'

import { theme } from 'styles/theme'

const AppProvider: React.FC = ({ children }) => {
  const providers = combineProviders()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  providers.push(MuiThemeProvider, { theme })
  providers.push(StyledThemeProvider, { theme })

  const MasterProvider = providers.master()

  return <MasterProvider>{children}</MasterProvider>
}

export { AppProvider }
