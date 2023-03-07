import {
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography
} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/search'
import { makeStyles } from '@material-ui/core/styles'

import TemplateDefault from '../src/templates/Default'
import TitleHead from '../src/components/TitleHead'
import Card from '../src/components/Card'

const useStyles = makeStyles((theme) => ({
  titleDest: {
    margin: theme.spacing(3),
  },
  cardMedia: {
    paddingTop: '56%',
  },
  searchPaper: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    margin: theme.spacing(3, 0, 6 ),
  },
}))

const Home = () => {
  const classes = useStyles()
  return (
    <TemplateDefault>
      <TitleHead 
        title='O que deseja encontrar?'
        variant='h3'
        subtitle={
          <>
            <Paper className={classes.searchPaper}>
              <InputBase 
                placeholder='Ex: Iphone XS Max com garantia'
                fullWidth
              />
              <IconButton type='submit' aria-label='search'>
                <SearchIcon />
              </IconButton>
            </Paper>
          </>
        }
      />

      <Container maxWidth='lg'>
        <Typography component='h2' variant='h4' align='center' color='textPrimary' className={classes.titleDest}>
          Destaques
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              image={'https://source.unsplash.com/random'}
              title='Produto X'
              subtitle='R$60,00'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card 
              image={'https://source.unsplash.com/random'}
              title='Produto X'
              subtitle='R$60,00'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <Card 
              image={'https://source.unsplash.com/random'}
              title='Produto X'
              subtitle='R$60,00'
            />
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export default Home