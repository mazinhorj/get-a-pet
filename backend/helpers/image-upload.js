const multer = require('multer')
const path = require('path')


const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = ""
    if (req.baseUrl.includes('users')) {
      folder = "users"
    } else if (req.baseUrl.includes('pets')) {
      folder = "pets"
    }
    cb(null, `public/images/${folder}`)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
  }
})

const imageUpload = multer({
  storage: imageStorage,
  limits: {fileSize: '1000000'},
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Formato de arquivo inválido! Utilize apenas jpg ou png."))
    }
    cb(undefined, true)
  }
})

module.exports = {imageUpload}