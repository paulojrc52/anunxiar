import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'

const MyApp = (props) => {
  const {Component, pageProps} = props

  return(
    <>
      <Head>
        <title>AnunXiar</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />  
        <Component {...pageProps} />
      </ThemeProvider>    
    </>
  )

  MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
  }
}

export default MyApp