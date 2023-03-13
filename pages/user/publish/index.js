import axios from 'axios'
import { Formik } from 'formik'
import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Container,
  Select,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  MenuItem,
  FormHelperText,
  Input,
  CircularProgress,
}from '@material-ui/core'

import TitleHead from '../../../src/components/TitleHead'
import TemplateDefault from '../../../src/templates/Default'
import FileUpload from '../../../src/components/FileUpload'
import useToasty from '../../../src/contexts/Toasty'
import { initialValues, validationSchema } from './formValues'
import { formatDateInfo } from '../../../src/utils/dateInfo'

import useStyles from './styles'
import { getSession } from 'next-auth/client'

const Publish = ({ userId, image }) => {
  const classes = useStyles()
  const { setToasty } = useToasty()
  const router = useRouter()

  const formValues = {
    ...initialValues,
  }

  formValues.userId = userId  
  formValues.image = image

  const handleSuccess = () => { 
    setToasty({
      open: true,
      text: 'Anúncio cadastrado com sucesso',
      severity: 'success'
    })

    router.push('/user/dashboard')
  }

  const handleError = () => {
    setToasty({
      open: true,
      text: 'Ops, ocorreu um erro, tente novamente',
      severity: 'error'
    })
  }

  const handleSubmit = (values) => {
    const formData = new FormData()
    values.publish = formatDateInfo(new Date())

    for(let field in values) {
      if(field === 'files') {
        values.files.forEach(file => {
          formData.append('files', file)
        })
      } else {
        formData.append(field, values[field])
      }
    }
  
    axios.post('/api/products/add', formData)
      .then(handleSuccess)
      .catch(handleError)
  }

  return (
    <TemplateDefault>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {
          ({
            values,
            touched,
            errors, 
            isSubmitting,
            handleChange,
            handleSubmit,
            setFieldValue
          }) => {

            return (

              <form onSubmit={handleSubmit}>
                <input type='hidden' name='userId' value={values.userId} />
                <input type='hidden' name='image' value={values.image} />

                <TitleHead 
                  title='Publicar Anúncio'
                  variant='h2'
                  subtitle={
                    <>
                      <Typography component='h5' variant='h5' align='center' color='textPrimary'>
                        Quanto mais detalhado, melhor!
                      </Typography>
                    </>
                  }
                />
                <Container maxWidth='md' className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <FormControl error={errors.title && touched.title} fullWidth>
                      <InputLabel className={classes.inputLabel}>Título do anúncio</InputLabel>
                      <Input 
                        name='title'
                        value={values.title}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {errors.title && touched.title  ? errors.title : null}
                      </FormHelperText>
                    </FormControl>
                    <br /><br />
                    <FormControl error={errors.category && touched.category} fullWidth>
                      <InputLabel className={classes.inputLabel}>Categoria</InputLabel>
                      <Select
                        name='category'
                        value={values.category}
                        fullWidth
                        onChange={handleChange}
                      >
                        <MenuItem value="Bebê e Crianças">Bebê e Crianças</MenuItem>
                        <MenuItem value="Agriculturas">Agriculturas</MenuItem>
                        <MenuItem value="Moda">Moda</MenuItem>
                        <MenuItem value="Carros, Motos e Barcos">Carros, Motos e Barcos</MenuItem>
                        <MenuItem value="Serviços">Serviços</MenuItem>
                        <MenuItem value="Lazer">Lazer</MenuItem>
                        <MenuItem value="Animais">Animais</MenuItem>
                        <MenuItem value="Moveis, Casa e Jardim">Moveis, Casa e Jardim</MenuItem>
                        <MenuItem value="Imóveis">Imóveis</MenuItem>
                        <MenuItem value="Equipamentos e Ferramentas">Equipamentos e Ferramentas</MenuItem>
                        <MenuItem value="Celulares e Tablets">Celulares e Tablets</MenuItem>
                        <MenuItem value="Esporte">Esporte</MenuItem>
                        <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                        <MenuItem value="Emprego">Emprego</MenuItem>
                        <MenuItem value="Outros">Outros</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors.category && touched.category ? errors.category : null}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                  <Container maxWidth='md' className={classes.boxContainer}>
                    <Box className={classes.box}>
                      <FileUpload 
                        files={values.files}
                        errors={errors.files}
                        touched={touched.files}
                        setFieldValue={setFieldValue}
                      />
                    </Box>
                  </Container>

                  <Container maxWidth='md' className={classes.boxContainer}>
                    <Box className={classes.box}>
                      <FormControl error={errors.description && touched.description} fullWidth>
                        <InputLabel className={classes.inputLabel}>Escreva os detalhes do que está vendendo</InputLabel>
                        <Input 
                          name='description'
                          value={values.description}
                          onChange={handleChange}
                          multiline
                          rows={6}
                          variant='outlined'                       
                        />
                        <FormHelperText>
                          {errors.description && touched.description  ? errors.description : null}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Container>

                  <Container maxWidth='md' className={classes.boxContainer}>
                    <Box className={classes.box}>
                      <FormControl error={errors.price && touched.price} fullWidth>
                        <InputLabel className={classes.inputLabel}>Preço de venda</InputLabel>
                        <Input 
                          name='price'
                          value={values.price}
                          onChange={handleChange}
                          variant='outlined'   
                          startAdornment={<InputAdornment position='start'>R$</InputAdornment>}                    
                        />
                        <FormHelperText>
                          {errors.price && touched.price ? errors.price : null}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Container>

                  <Container maxWidth='md' className={classes.boxContainer} >
                    <Box className={classes.box}>
                      <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
                        Localização
                      </Typography>
                      <FormControl error={errors.city && touched.city} fullWidth>
                        <InputLabel className={classes.inputLabel}>Cidade</InputLabel>
                        <Input 
                          name='city'
                          value={values.city}
                          onChange={handleChange}
                        />
                        <FormHelperText>
                          {errors.city && touched.city ? errors.city : null}
                        </FormHelperText>
                      </FormControl>

                      <FormControl error={errors.state && touched.state} fullWidth>
                        <InputLabel className={classes.inputLabel}>Estado</InputLabel>
                        <Input 
                          name='state'
                          value={values.state}
                          onChange={handleChange}
                        />
                        <FormHelperText>
                          {errors.state && touched.state ? errors.state : null}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Container>
                      <br /> <br />

                  <Container maxWidth='md' className={classes.boxContainer} >
                    <Box className={classes.box}>
                      <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
                        Dados de Contato
                      </Typography>
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
                      <br /> <br />
                      <FormControl error={errors.email && touched.email} fullWidth>
                        <InputLabel className={classes.inputLabel}>E-mail</InputLabel>
                        <Input 
                          name='email'
                          value={values.email}
                          onChange={handleChange}
                        />
                        <FormHelperText>
                          {errors.email && touched.email ? errors.email : null}
                        </FormHelperText>
                      </FormControl>
                      <br /><br />
                      <FormControl error={errors.phone && touched.phone} fullWidth>
                        <InputLabel className={classes.inputLabel}>Telefone</InputLabel>
                        <Input 
                          name='phone'
                          value={values.phone}
                          onChange={handleChange}
                        />
                        <FormHelperText>
                          {errors.phone && touched.phone ? errors.phone : null}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </Container>

                  <Container maxWidth='md' className={classes.boxContainer} >
                    <Box className={classes.boxButton}>
                      {
                        isSubmitting
                          ? <CircularProgress className={classes.loading} />
                          : <Button type='submit' variant='contained' color='primary'>
                              Publicar anúncio
                            </Button>
                      }
                    </Box>
                  </Container> 
                </form>
              )
            }
          }
        </Formik>
      </TemplateDefault>
    )
  }

Publish.requireAuth = true

export async function getServerSideProps({ req }) {
  const { userId, user } = await getSession({ req })

  return {
    props: {
      userId,
      image: user.image
    }
  }
}

export default Publish