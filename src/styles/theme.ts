import { createMuiTheme } from '@material-ui/core/styles'
import { plPL } from '@material-ui/core/locale'
import { TypeBackground } from '@material-ui/core/styles/createPalette'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2989f3',
      light: '#1da9ee',
      dark: '#0277cb'
    },
    text: {
      primary: '#fff',
      secondary: '#f2f2f2',
    },
    background: {
      banner: '#e5f3ff',
      default: '#333342',
      paper: '#3b3d4e'
    } as Partial<TypeBackground>,
  },
  typography: {
    fontFamily: 'Roboto',
    allVariants: {
      color: '#fff',
    }
  }
}, plPL)
