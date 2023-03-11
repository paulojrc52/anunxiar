import path from 'path'
import fs from 'fs'
import formidable from 'formidable-serverless'
import ProductsModel from '../models/products'
import dbConnect from '../utils/dbConnect'

const post = async (req, res) => {
  await dbConnect()

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: 'public/uploads',
    keepExtensions: true,
  })

  form.parse(req, (error, fields, data) => {
    if(error) {
      return res.status(500).json({ success: false })
    }
    
    const {files } = data

    const filesToRename = files instanceof Array
      ? files
      : [files]
  
    filesToRename.forEach( file => {
      const timestamp = Date.now()
      const random = Math.floor(Math.random() * 999999999) + 1
      const extension = path.extname(file.name)

      const filename = `${timestamp}_${random}${extension}`

      const oldpath = path.join(__dirname, `../../../../${file.path}`)
      const newpath = path.join(__dirname,  `../../../../${form.uploadDir}/${filename}`)
      
      fs.rename(oldpath, newpath, (error) => {
        if(error) {
          console.log(error)
          return res.status(500).json({ success: false })
        }
      })
    
    })
    res.status(200).json({ success: true })
  })

}

export {
  post
}