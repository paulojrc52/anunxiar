import PropTypes from 'prop-types'
import Head from 'next/head'
import { Provider } from 'next-auth/client'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { ToastyProvider } from '../src/contexts/Toasty'
import CheckAuth from '../src/components/CheckAuth'
import theme from '../src/theme'

const MyApp = (props) => {
  const {Component, pageProps} = props

  return(
    <>
      <Head>
        <title>AnunXiar</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
      </Head>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <ToastyProvider>
            <CssBaseline />  
            {
              Component.requireAuth
                ? <CheckAuth Component={Component} pageProps={pageProps} />
                : <Component {...pageProps} />
            }
          </ToastyProvider>
        </ThemeProvider>  
      </Provider>  
    </>
  )

  MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
  }
}

export default MyApp