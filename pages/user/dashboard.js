import { 
  Button, 
  Container, 
  Grid, 
  Typography 
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import TemplateDefault from '../../src/templates/Default'
import TitleHead from '../../src/components/TitleHead'
import Card from '../../src/components/Card'

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: '56%',
  },
}))

const Home = () => {
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
          <Card
                image={'https://source.unsplash.com/random'}
                title='Produto X'
                subtitle='R$60,00'
                actions={
                  <>
                    <Button size='small' color='primary'>
                      Editar
                    </Button>
                    <Button size='small' color='primary'>
                      Remover
                    </Button> 
                  </>
                }
              />    
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              image={'https://source.unsplash.com/random'}
              title='Produto X'
              subtitle='R$60,00'
              actions={
                <>
                  <Button size='small' color='primary'>
                    Editar
                  </Button>
                  <Button size='small' color='primary'>
                    Remover
                  </Button> 
                </>
                }
            />    
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <Card
              image={'https://source.unsplash.com/random'}
              title='Produto X'
              subtitle='R$60,00'
              actions={
                <>
                  <Button size='small' color='primary'>
                    Editar
                  </Button>
                  <Button size='small' color='primary'>
                    Remover
                  </Button> 
                </>
                }
            />  
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <Card
              image={'https://source.unsplash.com/random'}
              title='Produto X'
              subtitle='R$60,00'
              actions={
                <>
                  <Button size='small' color='primary'>
                    Editar
                  </Button>
                  <Button size='small' color='primary'>
                    Remover
                  </Button> 
                </>
                }
            />  
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export default Home