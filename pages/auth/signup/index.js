import { Formik } from 'formik'

import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  Typography,
} from '@material-ui/core'

import TemplateDefault from '../../../src/templates/Default'
import TitleHead from '../../../src/components/TitleHead'
import useStyles from './styles'
import { initialValues, validationSchema } from './formValues'

const Signup = () => {
const classes = useStyles()

 return(
    <TemplateDefault>  
      <TitleHead 
        title='Crie sua conta'
        variant='h2'
        subtitle={
          <>
            <Typography component='h5' variant='h5' align='center' color='textPrimary'>
              E anuncie para todo o Brasil
            </Typography>
          </>
        }
      />

      <Container maxWidth='md'>
        <Box className={classes.box}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log('Ok, form enviado', values)
            }}
          > 
            {
              ({
                touched,
                values,
                errors,
                handleChange,
                handleSubmit,
              }) => {

                return(
                  <form onSubmit={handleSubmit}>
                    <FormControl error={errors.name && touched.name} fullWidth>
                      <InputLabel className={classes.inputLabel}>Nome</InputLabel>
                      <Input 
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                      />

                      <FormHelperText>
                        {errors.name && touched.name ? errors.name : null}
                      </FormHelperText>
                    </FormControl>

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

                    <FormControl error={errors.passwordConf && touched.passwordConf} fullWidth>
                      <InputLabel className={classes.inputLabel}>Confirmação de senha</InputLabel>
                      <Input 
                        name='passwordConf'
                        type='password'
                        value={values.passwordConf}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.passwordConf && touched.passwordConf ? errors.passwordConf : null}
                      </FormHelperText>
                    </FormControl>

                    <Button
                      type='submit'
                      variant='contained'
                      color='primary'
                      fullWidth
                      className={classes.submit} 
                    >
                      Cadastrar
                    </Button>
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

export default Signup