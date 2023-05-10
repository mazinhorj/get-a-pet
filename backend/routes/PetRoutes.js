const router = require('express').Router()
const PetController = require('../controllers/PetController')

// middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/add', PetController.add)
// router.post('/login', PetController.login)
// router.get('/chkuser', PetController.chkUser)
// router.get('/:id', PetController.getPetById)
// router.patch('/edit/:id', verifyToken, imageUpload.single('image'), PetController.editPet)

module.exports = router