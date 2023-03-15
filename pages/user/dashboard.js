import { useState } from 'react'
import { getSession } from 'next-auth/client'
import axios from 'axios'

import { 
  Button, 
  Container, 
  Grid, 
  Typography,
  Dialog,
  DialogActions,
  DialogContent, 
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import TemplateDefault from '../../src/templates/Default'
import ProductsModel from '../../src/models/products'
import TitleHead from '../../src/components/TitleHead'
import Card from '../../src/components/Card'

import { formatCurrency } from '../../src/utils/currency'
import dbConnect from '../../src/utils/dbConnect'
import useToasty from '../../src/contexts/Toasty'

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: '56%',
  },
}))

const Home = ({ products }) => {
  const classes = useStyles()
  const { setToasty } = useToasty()
  const [productId, setProductId] = useState()
  const [removedProducts, setRemoveProducts] = useState([])
  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const handleCloseModal = () => setOpenConfirmModal(false)

  const handleClickRemove = (productId) => {
    setProductId(productId)
    setOpenConfirmModal(true)
  }

  const handleConfirmRemove = () => {
    axios.delete('/api/products/delete', {
      data: {
        id: productId
      }
    })
    .then(handleSuccess)
    .catch(handleError)
  }

  const handleSuccess = () => {
    setOpenConfirmModal(false)
    setRemoveProducts([ ...removedProducts, productId ])

    setToasty({
      open: true,
      severity: 'success',
      text: 'Anúncio removido com sucesso!'
    })

  }

  const handleError = () => {
    setOpenConfirmModal(false)
    setToasty({
      open: true,
      severity: 'error',
      text: 'Ops, algo deu errado!'
    })
  }

  return (   
    <TemplateDefault>
      <Dialog
        open={openConfirmModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Deseja realmente remover esse anúncio ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ao confirmar a operação, não poderá voltar atrás.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmRemove} color="primary" autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>
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
      <Container maxWidth='lg'>
        {
          products.length === 0 && 
          <Typography component='div' variant='body1' align='center' color='textPrimary' gutterBottom>
            Nenhum anúncio publicado...
          </Typography>
        }
        <Grid container spacing={4}>
          {
            products.map(product => {
              if(removedProducts.includes(product._id)) return null

              return (
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
                        <Button size='small' color='primary' onClick={() => handleClickRemove(product._id)}>
                          Remover
                        </Button> 
                      </>
                    }
                  />    
                </Grid>
              )
            })
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