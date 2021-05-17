import { createMuiTheme } from '@material-ui/core/styles'
import { plPL } from '@material-ui/core/locale'

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#2989f3',
      light: '#1da9ee',
      dark: '#0277cb'
    },
    background: {
      default: '#333342',
      paper: '#3b3d4e'
    }
  }
}, plPL)
