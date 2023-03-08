import { useState } from 'react'
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
  title: yup.string()
    .min(6, 'Escreva um título maior')
    .max(100, 'Título muito grande')
    .required('Campo obrigatório'),
  category: yup.string().required('Campo obrigatório'),
  description: yup.string()
    .min(50, 'Escreva uma descrição com pelo menos 50 caracteres.')
    .required('Campo obrigatório'),
})

const Publish = () => {
  const classes = useStyles()
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFile) => {
      const newFiles = acceptedFile.map(file => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      })

      setFiles([
        ...files,
        ...newFiles
      ])
    }
  })
  

  const handleRemoveFile = (fileName) => {
    console.log(fileName)
    const newFileState = files.filter(file => file.name !== fileName)

    setFiles(newFileState)
  }

  return (
    <TemplateDefault>
      <Formik
        initialValues={{
          title: '',
          category: '',
          description: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('ok enviou o form', values)
        }}
      >
        {
          ({
            values,
            errors,
            handleChange,
            handleSubmit
          }) => {
          console.log(errors)
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
                  <FormControl error={errors.title} fullWidth>
                    <InputLabel className={classes.inputLabel}>Título do anúncio</InputLabel>
                    <Input 
                      name='title'
                      value={values.title}
                      onChange={handleChange}
                    />
                    <FormHelperText>
                      {errors.title}
                    </FormHelperText>
                  </FormControl>
                  <br /><br />
                  <FormControl error={errors.category} fullWidth>
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
                      {errors.category}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

                <Container maxWidth='md' className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
                      Imagens
                    </Typography>
                    <Typography component='div' variant='body2' color='textPrimary'>
                      A primeira imagem é a foto principal do seu anúncio.
                    </Typography>
                    <Box className={classes.thumbsContainer}>
                      <Box className={classes.dropzone} {...getRootProps()}>
                        <input {...getInputProps()}/>
                        <Typography variant='body2' color='textPrimary'>
                          Clique para adicionar ou arraste a imagem para aqui.
                        </Typography>
                      </Box>

                      {
                        files.map((file, index) => (
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
                    <FormControl error={errors.description} fullWidth>
                      <InputLabel className={classes.inputLabel}>Escreva os detalhes do que está vendendo</InputLabel>
                      <Input 
                        name='description'
                        value={values.title}
                        onChange={handleChange}
                        multiline
                        rows={6}
                        variant='outlined'                       
                      />
                      <FormHelperText>
                        {errors.description}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth='md' className={classes.boxContainer}>
                  <Box className={classes.box}>
                    <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
                      Preço
                    </Typography>
                    <FormControl fullWidth variant='outlined'>
                      <InputLabel>Valor</InputLabel>
                      <OutlinedInput 
                        onChange={() => {}}
                        startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
                        labelWidth={40}
                      />
                    </FormControl>
                  </Box>
                </Container>


                <Container maxWidth='md' className={classes.boxContainer} >
                  <Box className={classes.box}>
                    <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
                      Dados de Contato
                    </Typography>
                    <TextField 
                      label='Nome'
                      variant='outlined'
                      size='small'
                      fullWidth
                    />
                    <br /> <br />
                    <TextField 
                      label='E-mail'
                      variant='outlined'
                      size='small'
                      fullWidth
                    />
                    <br /><br />
                    <TextField 
                      label='Telefone'
                      variant='outlined'
                      size='small'
                      fullWidth
                    />
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