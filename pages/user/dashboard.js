import { getSession } from 'next-auth/client'

import { 
  Button, 
  Container, 
  Grid, 
  Typography 
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import TemplateDefault from '../../src/templates/Default'
import ProductsModel from '../../src/models/products'
import TitleHead from '../../src/components/TitleHead'
import Card from '../../src/components/Card'

import { formatCurrency } from '../../src/utils/currency'
import dbConnect from '../../src/utils/dbConnect'

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: '56%',
  },
}))

const Home = ({ products }) => {
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
          {
            products.map(product => (
              <Grid key={product._id} item xs={12} sm={6} md={4}>
                <Card
                  image={`/uploads/${product.files[0].name}`}
                  title={product.title}
                  subtitle={formatCurrency(product.price)}
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

            ))
          }

        </Grid>
      </Container>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export async function getServerSideProps({ req }) {
  const { userId } = await getSession({ req })

  await dbConnect()

  const products = await ProductsModel.find({ 'user.id': userId})

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}

export default Home