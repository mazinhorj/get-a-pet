// const path = require('path')

const Pet = require('../models/Pet')
const PetImage = require('../models/PetImage')

const User = require('../models/User')

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const { where } = require('sequelize')


module.exports = class PetController {


  static async add(req, res) {

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

    // getting pet images
    let allPetPics = { petpic }
    petpic.map((pic) => {
      allPetPics.petpic.push(pic.filename)
    })
    allPetPics = petpic.slice(allPics)

    // adding a pet  
    try {
      const newPet = await Pet.create({ name, age, weight, color, available, ownerId: user.id })
      allPetPics.forEach(p => { PetImage.create({ petpic: p, petId: newPet.id, ownerId: user.id }) })

      res.status(201).json({ message: `${name} cadastrado com sucesso.`, newPet, allPetPics })

    } catch (error) {
      res.status(500).json({ message: "Algo não saiu como esperado. Tente de novo: " + error })
    }

  }


  static async allPets(req, res) {

    const pets = await Pet.findAll({ order: [['updatedAt', 'DESC']] })
    const petpics = await PetImage.findAll()
    res.status(200).json({ pets, petpics })

  }


  static async allUserPets(req, res) {

    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.findAll({ where: { ownerId: user.id }, order: [['updatedAt', 'DESC']] })
    const adoptedPets = await Pet.findAll({ where: { adopterId: user.id }, order: [['updatedAt', 'DESC']] })
    const petpics = await PetImage.findAll({ where: { ownerId: user.id } })
    res.status(200).json({ pets, adoptedPets, petpics })

  }


  static async allUserAdoptions(req, res) {

    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.findAll({ where: { adopterId: user.id }, order: [['updatedAt', 'DESC']] })

    if (pets.length === 0) {
      res.status(404).json({ message: "Você ainda não adotou nenhum pet." })
      return
    }

    const petpics = await PetImage.findAll({ where: { adopterId: user.id } })
    if (petpics.length === 0) {
      res.json({ pets, message: "Sem fotos pare exibir." })
      return
    } else {
      res.status(200).json({ pets, petpics })
    }


  }


  static async getPetById(req, res) {

    const id = req.params.id

    if (!id) {
      res.status(422).json({ message: "Precisa informar um ID!" })
      return
    }

    const pet = await Pet.findOne({ where: { id } })

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" })
      return
    }

    res.status(200).json({ pet })

  }


  static async removePetById(req, res) {

    const id = req.params.id

    if (!id) {
      res.status(422).json({ message: "Precisa informar um ID para excluir!" })
      return
    }

    const pet = await Pet.findOne({ where: { id } })

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    if (pet.ownerId !== user.id) {
      res.status(422).json({ message: "Houve um problema ao processar sua solicitação! Por favor, tente mais tarde." })
      return
    }

    await Pet.destroy({ where: { id } })

    res.status(200).json({ message: "Pet excluído com sucesso" })

  }


  static async editPet(req, res) {

    const id = req.params.id
    const { name, age, weight, color, available } = req.body
    const petpic = req.files
    const updatedPetData = {}

    if (!id) {
      res.status(422).json({ message: "Precisa informar um ID para editar!" })
      return
    }

    const pet = await Pet.findOne({ where: { id } })

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)

    const petOwner = await User.findOne({ where: { id: pet.ownerId } })

    console.log(pet.adopterId + "<=>" + user.id)

    // esse codigo permite que o adotante faça alterações no pet
    // if (pet.adopterId) {
    //   if (pet.adopterId !== user.id) {
    //     res.status(422).json({ message: "Houve um problema ao processar sua solicitação! Por favor, tente mais tarde." })
    //     return
    //   }
    // } else if (pet.ownerId !== user.id) {
    //   res.status(422).json({ message: "Houve um problema ao processar sua solicitação! Por favor, tente mais tarde." })
    //   return
    // }
    // ---------------------------------------------------------------------------------

    // dessa forma apenas quem cadastrou (o dono) o pet pode alterá-lo
    if (pet.ownerId !== user.id) {
      res.status(422).json({ message: "Houve um problema ao processar sua solicitação! Por favor, tente mais tarde." })
      return
    }

    let allPics = petpic.length
    console.log(`VIERAM ${allPics} FOTOS`)

    // validations
    if (!name) {
      res.status(422).json({ message: "O Nome é obrigatório." })
      return
    } else {
      updatedPetData.name = name
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória." })
      return
    } else {
      updatedPetData.age = age
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório." })
      return
    } else {
      updatedPetData.weight = weight
    }
    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória." })
      return
    } else {
      updatedPetData.color = color
    }
    if (petpic.length === 0) {
      res.status(422).json({ message: "Pelo menos 1 foto é obrigatória." })
      return
    }

    let allPetPics = { petpic }
    petpic.map((pic) => {
      allPetPics.petpic.push(pic.filename)
    })
    allPetPics = petpic.slice(allPics)

    try {
      const editedPet = await Pet.update({ where: { id }, updatedPetData })
      allPetPics.forEach(p => { PetImage.create({ petpic: p, petId: editedPet.id, ownerId: user.id }) })

      res.status(201).json({ message: `${name} atualizado com sucesso.`, editedPet, allPetPics })

    } catch (error) {
      res.status(500).json({ message: "Algo não saiu como esperado. Tente de novo: " + error })
    }

  }


  static async schedule(req, res) {

    const id = req.params.id
    const { name, age, weight, color, available, ownerId } = req.body
    const petpic = req.files
    const updatedPetData = {}

    if (!id) {
      res.status(422).json({ message: "Precisa informar um ID para editar!" })
      return
    }

    const pet = await Pet.findOne({ where: { id } })

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado" })
      return
    }

    const token = getToken(req)
    const user = await getUserByToken(token)
    if (pet.ownerId === user.id) {   //
      res.status(422).json({ message: "Não pode agendar visita. Este pet é seu!" })
      return
    }
    // console.log(user)

    if (pet.adopterId) {
      if (pet.adopterId === user.id) {
        res.status(422).json({ message: "Visita já agendada!" })
        return
      }
    }

    const petOwner = await User.findOne({ where: { id: pet.ownerId } })
    // console.log(petOwner.name)
    // console.log("ANTES DE SALVAR O ADOTANTE")
    // console.log(pet)

    pet.adopterId = user.id

    await pet.save()
    // await Pet.update(pet, { where: { id } })
    res.status(200).json({ message: `Visita para ${pet.name} agendada. Entre em contato com ${petOwner.name} pelo telefone ${petOwner.phone}.`, pet })

    // console.log(`DEPOIS DE SALVAR O ADOTANTE`)
    // console.log(pet)

  }


}