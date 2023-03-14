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

import Link from 'next/link'

import TemplateDefault from '../src/templates/Default'
import TitleHead from '../src/components/TitleHead'
import Card from '../src/components/Card'
import { formatCurrency } from '../src/utils/currency'
import dbConnect from '../src/utils/dbConnect'
import ProductsModel from '../src/models/products'
import slugify from 'slugify'

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: '56%',
  },
  searchPaper: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    margin: theme.spacing(3, 0, 3 ),
  },
  productLink: {
    textDecoration: 'none !important',
  },
}))

const Home = ({ products }) => {
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
        <br /> <br />
        <Grid container spacing={4}>
          {
            products.map(product => {
              const category = slugify(product.category).toLowerCase()
              const title = slugify(product.title).toLowerCase()

              return (
                <Grid key={product._id} item xs={12} sm={6} md={4}>
                  <Link href={`/${category}/${title}/${product._id}`} passHref className={classes.productLink}>
                    <Card 
                      image={`/uploads/${product.files[0].name}`}
                      title={product.title}
                      subtitle={formatCurrency(product.price)}
                    />
                  </Link>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export async function getServerSideProps() {
  await dbConnect()

  const products = await ProductsModel.aggregate([{
    $sample: { size: 6 }
  }])

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default Home