import ProductsModel from '../../models/products'
import dbConnect from '../../utils/dbConnect'

const remove = async (req, res) => {
  await dbConnect()

  const id = req.body.id

  const deleted = await ProductsModel.findOneAndRemove({ _id: id })

  if(deleted) {
    return res.status(200).json({ success: true })
  } else{
    return res.status(500).json({ success: false })
  }
}

export {
  remove,
}