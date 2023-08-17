import '@/styles/globals.css'
import '@/styles/sweetAlert.css'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
const theme = createTheme({
  palette: {
    primary: {
      light: '#FFD778',
      main: '#FFD778',
      dark: '#FFD778',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
})
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
