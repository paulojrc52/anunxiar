import { useDropzone } from 'react-dropzone'
import { Formik } from 'formik'
import * as yup from 'yup'

import {
  Box,
  Button,
  Container,
  IconButton,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  FormHelperText,
  Input,
}from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'

import TitleHead from '../../src/components/TitleHead'
import TemplateDefault from '../../src/templates/Default'

const useStyles = makeStyles((theme) => ({
  mask: {},
  mainImage: {},
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  },
  boxContainer: {
    paddingBottom: theme.spacing(3),
  },
  boxButton: {
    textAlign:'right',
  },
  thumbsContainer: {
    display: 'flex',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  inputLabel: {
    fontWeight: 400,
    color: theme.palette.primary.main,
  },
  dropzone: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    margin: '0 15px 15px 0',
    width: 200,
    height: 150,
    backgroundColor: theme.palette.background.default,
    border: '2px dashed black'
  },
  thumb: {
    position: 'relative',
    width: 200,
    height: 150,
    backgroundSize: 'cover',
    margin: '0 15px 15px 0',
    backgroundPosition: 'center center',

    '& $mainImage': {
      backgroundColor: 'blue',
      padding: '2px 8px',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },

    '& $mask': {
      display: 'none',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      height: '100%',
      width: '100%',
    },

    '&:hover $mask': {
      display: 'flex',
    },


  },

}))

const validationSchema = yup.object().shape({
  title: yup.string().min(6, 'Escreva um título maior')
    .max(100, 'Título muito grande')
    .required('Campo obrigatório'),
  category: yup.string().required('Campo obrigatório'),
  description: yup.string()
    .min(50, 'Escreva uma descrição com pelo menos 50 caracteres.')
    .required('Campo obrigatório'),
  price: yup.number().required('Campo obrigatório'),
  email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  phone: yup.string().required('Campo obrigatório'),
  files: yup.array()
    .min(1, 'Envie pelo menos uma imagem')
    .required('Campo obrigatório')
})

const Publish = () => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Formik
        initialValues={{
          title: '',
          category: '',
          description: '',
          price: '',
          email: '',
          name: '',
          phone: '',
          files: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('ok enviou o form', values)
        }}
      >
        {
          ({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue
          }) => {

            const { getRootProps, getInputProps } = useDropzone({
              accept: 'image/*',
              onDrop: (acceptedFile) => {
                const newFiles = acceptedFile.map(file => {
                  return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                  })
                })
          
                setFieldValue('files', [
                  ...values.files,
                  ...newFiles
                ])
              }
            })
            
            const handleRemoveFile = (fileName) => {
              const newFileState = values.files.filter(file => file.name !== fileName)

              setFieldValue('files', newFileState)
            }

            return (

              <form onSubmit={handleSubmit}>
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
                      <Typography component='h6' variant='h6' color={errors.files && touched.files ? 'error' : 'textPrimary'} gutterBottom>
                        Imagens
                      </Typography>
                      <Typography component='div' variant='body2' color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                        A primeira imagem é a foto principal do seu anúncio.
                      </Typography>

                      {
                        errors.files && touched.files
                          ? <Typography variant='body2' color='error' gutterBottom>{errors.files}</Typography>
                          : null
                      }

                      <Box className={classes.thumbsContainer}>
                        <Box className={classes.dropzone} {...getRootProps()}>
                          <input name='files' {...getInputProps()}/>
                          <Typography variant='body2' color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                            Clique para adicionar ou arraste a imagem para aqui.
                          </Typography>
                        </Box>

                        {
                          values.files.map((file, index) => (
                            <Box 
                              key={file.name}
                              className={classes.thumb}
                              style={{backgroundImage: `url(${file.preview})`}}
                            >

                              {
                                index === 0 ? 
                                  <Box className={classes.mainImage}>
                                    <Typography variant='body2' color='secondary'>
                                      Principal
                                    </Typography>
                                  </Box>
                                  : null
                              }
                              <Box className={classes.mask}>
                                <IconButton color='secondary' onClick={() => handleRemoveFile(file.name)}>
                                  <DeleteForever fontSize='large'/>
                                </IconButton>
                              </Box>
                            </Box>

                          ))
                        }

                      </Box>
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
                      <Button type='submit' variant='contained' color='primary'>
                        Publicar anúncio
                      </Button>
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


export default Publish