import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import TemplateDefault from '../src/templates/Default'

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  productName: {
    margin: '15px 0',
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 10,
  }
}))

const Product = () => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Box className={classes.box}>
              Carrossel
            </Box>

            <Box className={classes.box} textAlign='left'>
              <Typography component='span' variant='caption'>Publicado em 10 de Dezembro de 2022</Typography>
              <Typography component='h4' variant='h4' className={classes.productName}>Jaguar XE 2.0 D R-Sport Aut.</Typography>
              <Typography component='h4' variant='h4' className={classes.price}>R$ 50.000,00</Typography>
              <Chip label='Categoria' />
            </Box>

            <Box className={classes.box} textAlign='left'>
              <Typography component='h6' variant='h6'>Descrição</Typography>
              <Typography component='p' variant='body2'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Card elevation={0} className={classes.box}>
              <CardHeader 
                avatar={
                  <Avatar>P</Avatar>
                }
                title='Paulo Junior'
                subheader='paulojrcosta300@gmail.com'
              />
              <CardMedia 
                image={'https://source.unsplash.com/random'}
                title='Paulo Junior'
              />
            </Card>

            <Box className={classes.box}>
              <Typography component='h6' variant='h6'>Localização</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export default Product