import nextConnect from 'next-connect'
import { remove } from '../../../src/controllers/products/remove'

const route = nextConnect()

route.delete(remove)

export default route
