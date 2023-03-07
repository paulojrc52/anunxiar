import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

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
      <TitleHead 
        title='Publicar Anúncio'
        subtitle='Quanto mais detalhado, melhor!'
      />

      <Container maxWidth='md' className={classes.boxContainer}>
        <Box className={classes.box}>
          <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
            Título do anúncio
          </Typography>
          <TextField 
            label='ex.: Biciclete Aro 18 com garantia'
            size='small'
            fullWidth
          />
          <br /><br />
          <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
            Categoria
          </Typography>
          <Select
            native
            value=''
            fullWidth
            onChange={() => {}}
            inputProps={{
              name: 'age',
            }}
          >
            <option value="">Selecione</option>
            <option value={1}>Bebê e Crianças</option>
            <option value={2}>Agriculturas</option>
            <option value={3}>Moda</option>
            <option value={3}>Carros, Motos e Barcos</option>
            <option value={3}>Serviços</option>
            <option value={3}>Lazer</option>
            <option value={3}>Animais</option>
            <option value={3}>Moveis, Casa e Jardim</option>
            <option value={3}>Imóveis</option>
            <option value={3}>Equipamentos e Ferramentas</option>
            <option value={3}>Celulares e Tablets</option>
            <option value={3}>Esporte</option>
            <option value={3}>Tecnologia</option>
            <option value={3}>Emprego</option>
            <option value={3}>Outros</option>
          </Select>
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
          <Typography component='h6' variant='h6' color='textPrimary' gutterBottom>
            Descrição
          </Typography>
          <Typography component='div' variant='body2' color='textPrimary'>
            Escreva os detalhes do que está vendendo
          </Typography>
          <TextField 
            multiline
            rows={6}
            variant='outlined'
            fullWidth
          />
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
          <Button variant='contained' color='primary'>
            Publicar anúncio
          </Button>
        </Box>
      </Container>
    </TemplateDefault>
  )
}

export default Publish