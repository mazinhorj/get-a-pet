const router = require('express').Router()
const PetController = require('../controllers/PetController')

// middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/add', verifyToken, imageUpload.array('petpic'), PetController.add)

router.get('/', PetController.allPets)

router.get('/pet/', PetController.getPetById)
router.get('/pet/:id', PetController.getPetById)

router.get('/mypets', verifyToken, PetController.allUserPets)

router.get('/myadoptions', verifyToken, PetController.allUserAdoptions)

router.delete('/pet/:id', verifyToken, PetController.removePetById)

router.patch('/edit/', PetController.editPet)
router.patch('/edit/:id', verifyToken, imageUpload.array('petpic'), PetController.editPet)

router.patch('/schedule/', PetController.schedule)
router.patch('/schedule/:id', verifyToken, imageUpload.array('petpic'), PetController.schedule)

module.exports = router