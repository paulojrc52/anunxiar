import { 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Container, 
  Grid, 
  Typography 
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import TemplateDefault from '../../src/templates/Default'
import TitleHead from '../../src/components/TitleHead'

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: '56%',
  },
}))

export default function Home() {
const classes = useStyles()

  return (
    <TemplateDefault>
      <TitleHead 
        title='Meus Anúncios'
        variant='h2'
        button={
          <>
            <Button variant='contained' color='primary'>
              Publicar novo anúncio
            </Button>
          </>
        }
        path='/user/publish'
      />
      <Container maxWidth='md'>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia} 
                image={'https://source.unsplash.com/random'}
                title="Tiulo da imagem"
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Produto X
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>
                  Editar
                </Button>
                <Button size='small' color='primary'>
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia} 
                image={'https://source.unsplash.com/random'}
                title="Tiulo da imagem"
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Produto X
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>
                  Editar
                </Button>
                <Button size='small' color='primary'>
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia} 
                image={'https://source.unsplash.com/random'}
                title="Tiulo da imagem"
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Produto X
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>
                  Editar
                </Button>
                <Button size='small' color='primary'>
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia} 
                image={'https://source.unsplash.com/random'}
                title="Tiulo da imagem"
              />
              <CardContent>
                <Typography variant='h5' component='h2'>
                  Produto X
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>
                  Editar
                </Button>
                <Button size='small' color='primary'>
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}