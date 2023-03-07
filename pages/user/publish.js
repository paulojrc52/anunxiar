import {
  Box,
  Button,
  Container,
  Select,
  TextField,
  Typography
}from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import TitleHead from '../../src/components/TitleHead'
import TemplateDefault from '../../src/templates/Default'

const useStyles = makeStyles((theme) => ({
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

}))

const Publish = () => {
  const classes = useStyles()

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