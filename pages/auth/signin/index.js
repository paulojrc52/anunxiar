import { Formik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'

import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  CircularProgress
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import TemplateDefault from '../../../src/templates/Default'
import TitleHead from '../../../src/components/TitleHead'
import useToasty from '../../../src/contexts/Toasty'
import { initialValues, validationSchema } from './formValues'
import useStyles from './styles'


const Signin = ({ APP_URL }) => {
  const classes = useStyles()
  const router = useRouter()
  const {toasty, setToasty } = useToasty()
  const [ session ] = useSession()

  const handleFormSubmit = async values => {
    signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: `${APP_URL}/user/dashboard`
    })
  }

  return(
    <TemplateDefault>  
      <TitleHead 
        title='Entre na sua conta'
        variant='h2'
      />

      <Container maxWidth='md'>
        <Box className={classes.box}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          > 
            {
              ({
                touched,
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting
              }) => {

                return(
                  <form onSubmit={handleSubmit}>
                    {
                      router.query.i === '1'
                      ? (
                        <Alert severity='error' className={classes.errorMessage}>
                          Usuário ou senha inválidos
                        </Alert>
                      )
                      : null
                    }
                    <FormControl error={errors.email && touched.email} fullWidth>
                      <InputLabel className={classes.inputLabel}>E-mail</InputLabel>
                      <Input 
                        name='email'
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                      />

                      <FormHelperText>
                        {errors.email && touched.email ? errors.email : null}
                      </FormHelperText>
                    </FormControl>

                    <FormControl error={errors.password && touched.password} fullWidth>
                      <InputLabel className={classes.inputLabel}>Senha</InputLabel>
                      <Input 
                        name='password'
                        type='password'
                        value={values.password}
                        onChange={handleChange}
                      />

                      <FormHelperText>
                        {errors.password && touched.password ? errors.password : null}
                      </FormHelperText>
                    </FormControl>
                    {
                      isSubmitting 
                        ? (
                        <CircularProgress className={classes.loading}/>
                        ) : (
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                            className={classes.submit} 
                          >
                            Entrar
                          </Button>
                        )
                    }
                  </form>
                )
              }

            }
          </Formik>
        </Box>
      </Container>
    </TemplateDefault>
  )

}

Signin.getInitialProps = async function() {
  return {
    APP_URL: process.env.APP_URL
  }
}

export default Signin