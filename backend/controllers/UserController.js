const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')


module.exports = class UserController {
  
  // CADASTRO DE USUÁRIO
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword} = req.body
    // validations
    if (!name) {
      res.status(422).json({ message: "O Nome é obrigatório." })
      return
    }
    if (!email) {
      res.status(422).json({ message: "O E-mail é obrigatório." })
      return
    }
    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório." })
      return
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória." })
      return
    }
    if (!confirmpassword) {
      res.status(422).json({ message: "A confirmação da senha é obrigatória." })
      return
    }
    if (password !== confirmpassword) {
      res.status(422).json({ message: "As senhas não conferem." })
      return
    }

    //verificar se existe
    const userExists = await User.findOne({ where: { email: email } })
    if (userExists) {
      res.status(422).json({ message: "Este e-mail já está em uso." })
      return
    }

    //criar password
    const salt = await bcrypt.genSalt(12)
    const passHash = await bcrypt.hash(password, salt)

    //criar usuario

    try {
      const newUser = await User.create({ name, email, phone, password: passHash })
      await createUserToken(newUser, req, res)
      console.log(newUser)
      
    } catch (error) {
      res.status(500).json({message: error})
    }
    // res.status(201).json({message: `Usuário ${name} cadastrado com sucesso.`})
  }

  // LOGIN
  static async login(req, res) {
    const { email, password } = req.body
    
    if (!email) {
      res.status(422).json({ message: "O E-mail é obrigatório." })
      return
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória." })
      return
    }

    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado." })
      return
    }

    // verificar senha
    const chkPass = await bcrypt.compare(password, user.password)
    if (!chkPass) {
      res.status(422).json({ message: "A senha está incorreta." })
      return
    }
    await createUserToken(user, req, res)
  }

  // USUARIO COM TOKEN
  static async chkUser(req, res) {
    
    let currentUser
    
    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, 'SegredinhoDoToken')
      currentUser = await User.findByPk(decoded.id)
      currentUser.password = undefined
    } else {
      currentUser = null
    }
    res.status(200).send(currentUser)
  }

  // Usuário por ID
  static async getUserById(req, res) {
    const id = req.params.id
    const user = await User.findByPk(id)
    user.password = undefined
    if (!user) {
      res.status(422).json({
        message: "Usuário não encontrado."
      })
    }
    res.status(200).json({user})
  }

  // Editar usuário
  static async editUser(req, res) {

    const id = req.params.id
    const { name, email, phone, password, confirmpassword } = req.body

    let image = ''

    // validações


    // verificar se existe
    const user = await User.findByPk(id)
    if (!user) {
      res.status(422).json({
        message: "Usuário não encontrado."
      })
      return
    }


    res.status(200).json({
      message: "Usuário atualizado."
    })
  }
}