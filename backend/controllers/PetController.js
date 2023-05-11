// const path = require('path')

const Pet = require('../models/Pet')
const PetImage = require('../models/PetImage')

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


module.exports = class PetController {


  static async add(req, res) {
    // var numeros = ["A", 2, 3, 4, 6, 7, 8, 9, 10];

    // numeros = numeros.filter(item => item >= 3);
    // numeros.splice(numeros.indexOf(3), 1);
    // console.log(numeros);
    // res.json({message: "Vem bicho aí"})
    // destructuring consts coming from body
    const { name, age, weight, color } = req.body
    const available = true
    
    // images upload
    const petpic = req.files
    let allPics = petpic.length
    console.log(`VIERAM ${allPics} FOTOS`)

    // validations
    if (!name) {
      res.status(422).json({ message: "O Nome é obrigatório." })
      return
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória." })
      return
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório." })
      return
    }
    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória." })
      return
    }
    if (petpic.length === 0) {
      res.status(422).json({ message: "Pelo menos 1 foto é obrigatória." })
      return
    }



    // get pet owner
    const token = getToken(req)
    const user = await getUserByToken(token)
    
    // adding a pet  
    let allPetPics = {petpic}
    petpic.map((pic) => {
      allPetPics.petpic.push(pic.filename)
    })

    // console.log(allPetPics)
    // console.log(petpic.length)

    // allPetPics.shift()
    allPetPics = petpic.slice(allPics)
    console.log(allPetPics)
    try {
      const newPet = await Pet.create({ name, age, weight, color, available, owner: user.id })
      while (allPetPics.length >= 0) {
        await PetImage.create({ petpic: allPetPics })
      }
      // console.log(newPet)
      // console.log(newPetPic)
      res.status(201).json({ message: `${name} cadastrado com sucesso.`, newPet, allPetPics })
      
      // await createUserToken(newUser, req, res)
      
    } catch (error) {
      res.status(500).json({ message: error })
    }

  }

}