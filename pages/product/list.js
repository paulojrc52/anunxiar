import {
  Box,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/search'
import { makeStyles } from '@material-ui/core/styles'

import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Card'

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  searchPaper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
    marginBottom: 20,
  },
  card: {
    height: '100%',
  },
  cardMedia: {
    paddingTop: '56%'
  }
}))

const List = () => {
  const classes = useStyles()

  return ( 
    <TemplateDefault>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper component='form' className={classes.searchPaper}>
              <InputBase 
                placeholder='Ex.: Iphone XS MAX com garantia'
                fullWidth
              />
              <IconButton type='submit' aria-label='search'>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>  
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.box}>
            <Typography component='h6' variant='h6' color='textPrimary'>
              Anúncios
            </Typography>
            <Typography component='span' variant='subtitle2' color='textPrimary'>
              ENCONTRADOS 200 ANÚNCIOS
            </Typography>
            <br /><br />
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
          </Box>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export default List