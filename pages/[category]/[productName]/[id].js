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
import Carousel from 'react-material-ui-carousel'

import TemplateDefault from '../../../src/templates/Default'
import ProductsModel from '../../../src/models/products'
import dbConnect from '../../../src/utils/dbConnect'
import { formatCurrency } from '../../../src/utils/currency'


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
  },
  card: {
    height: '100%',
  },
  cardMedia: {
    paddingTop:'100%',
  },
}))

const Product = ({ product }) => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Container maxWidth='lg'>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Box className={classes.box}>
              <Carousel
                autoPlay={false}
                navButtonsProps={{
                  style: {
                    color: 'white'
                  }
                }}
                animation='slide'

              >
                {
                  product.files.map(file => (
                    <Card key={file.name} className={classes.card}> 
                      <CardMedia 
                        className={classes.cardMedia}
                        image={`/uploads/${file.name}`}
                        title={product.title}
                      />
                    </Card>
                  ))
                }
              </Carousel>
            </Box>

            <Box className={classes.box} textAlign='left'>
              <Typography component='span' variant='caption'>Publicado às {product.published}</Typography>
              <Typography component='h4' variant='h4' className={classes.productName}>{product.title}</Typography>
              <Typography component='h4' variant='h4' className={classes.price}>{formatCurrency(product.price)}</Typography>
              <Chip label={product.category} />
            </Box>

            <Box className={classes.box} textAlign='left'>
              <Typography component='h6' variant='h6'>Descrição</Typography>
              <Typography component='p' variant='body2'>
                {product.description}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Card elevation={0} className={classes.box}>
              <CardHeader 
                avatar={
                  <Avatar>
                    { product.user.name[0] }
                  </Avatar>
                }
                title={product.user.name}
                subheader={product.user.phone}
                
              />
              <CardMedia 
                image={product.user.image}
                title={product.user.name}
              />
            </Card>

            <Box className={classes.box}>
              <Typography component='h6' variant='h6'>{product.city}, {product.state}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

export async function getServerSideProps({ query }) {
  const { id } = query

  await dbConnect()

  const product = await ProductsModel.findOne({ _id: id})

  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  }
}

export default Product