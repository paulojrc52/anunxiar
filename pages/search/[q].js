import Link from 'next/link'
import slugify from 'slugify'

import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import ProductsModel from '../../src/models/products'
import TemplateDefault from '../../src/templates/Default'
import TitleHead from '../../src/components/TitleHead'
import Card from '../../src/components/Card'
import { formatCurrency } from '../../src/utils/currency'
import InputSearch from '../../src/components/InputSearch'

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  card: {
    height: '100%',
  },
  cardMedia: {
    paddingTop: '56%'
  },
  productLink: {
    textDecoration: 'none !important',
  },
}))

const List = ({ q, products }) => {
  const classes = useStyles()

  return ( 
    <TemplateDefault>
      <Container maxWidth='lg'>
        <TitleHead 
          subtitle={
           <InputSearch />
          }
        />

        <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.box}>
            <Typography component='h6' variant='h6' color='textPrimary'>
              Anúncios
            </Typography>
            <Typography component='span' variant='subtitle2' color='textPrimary'>
              ENCONTRADOS {products.length} ANÚNCIOS PARA {`"${q}"`}
            </Typography>
            <br /><br />
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
          </Box>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export async function getServerSideProps({ query }) {
  const { q } = query

  const products = await ProductsModel.find({
    $or: [
      {
        title: {
          $regex: q,
          $options: 'i'
        }
      },
      {
        description: {
          $regex: q,
          $options: 'i'
        }
      },
    ]
  })

  return {
    props: {
      q,
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default List