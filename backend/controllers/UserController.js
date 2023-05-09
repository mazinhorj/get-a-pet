const CPF = require('cpf')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


module.exports = class UserController {

  // CADASTRO DE USUÁRIO
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword, ucpf } = req.body
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
    if (!ucpf) {
      res.status(422).json({ message: "O CPF é obrigatório." })
      return
    }
    if (CPF.isValid(ucpf) === false) {
      res.status(422).json({ message: "CPF inválido." })
      return
    }
    const fucpf = CPF.format(ucpf)
    const ucpfExists = await User.findOne({ where: { ucpf: fucpf } })
    if (ucpfExists) {
      res.status(422).json({ message: "CPF já cadastrado." })
      return
    }
    console.log(`CPF formatado: ${fucpf}`)

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
      const newUser = await User.create({ name, email, phone, password: passHash, ucpf: fucpf })
      await createUserToken(newUser, req, res)
      console.log(newUser)

    } catch (error) {
      res.status(500).json({ message: error })
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
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })
    if (!user) {
      res.status(422).json({
        message: "Usuário não encontrado."
      })
      return
    }

    res.status(200).json({ user })
    return
  }

  // Editar usuário
  static async editUser(req, res) {

    const uid = req.params.id
    const idExists = await User.findOne({ where: { id: uid } })
    if (!idExists) {
      res.status(422).json({
        message: "Usuário não encontrado."
      })
      return
    }

    // usuario existe?
    const token = getToken(req)
    const user = await getUserByToken(token)
    const { id, name, email, phone, password, confirmpassword, ucpf } = req.body

    let image = ''

    if (req.file) {
      image = req.file.filename 
    }

    // validações
    if (!name) {
      res.status(422).json({ message: "O Nome é obrigatório." })
      return
    }
    user.name = name

    if (!email) {
      res.status(422).json({ message: "O E-mail é obrigatório." })
      return
    }
    // verificar se email já está cadastrado
    const emailExists = await User.findOne({ where: { email }, attributes: ['id'] })
    if (user.email !== email && emailExists && emailExists.id !== id) {
      res.status(422).json({
        message: "E-mail já está em uso. Utilize outro."
      })
      return
    }
    
    user.email = email
    console.log(email)

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório." })
      return
    }
    user.phone = phone

    if (image) {
      const imageName = req.file.filename
      user.image = imageName
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: "As senhas não conferem." })
      return
    } else if (password === confirmpassword && password != null) {
      const salt = await bcrypt.genSalt(12)
      const passHash = await bcrypt.hash(password, salt)
      user.password = passHash
    }
    
    const newPassword = user.password

    if (!ucpf) {
      res.status(422).json({ message: "O CPF é obrigatório." })
      return
    }
    if (!CPF.isValid(ucpf)) {
      res.status(422).json({ message: "CPF inválido." })
      return
    }
    const fucpf = CPF.format(ucpf)
    const cpfExists = await User.findOne({ where: { ucpf: fucpf }, attributes: ['id'] })
    if (user.ucpf !== fucpf && cpfExists && cpfExists.id !== id) {
      res.status(422).json({
        message: "CPF já cadastrado."
      })
      return
    }
    
    user.ucpf = fucpf
    // console.log(cpfExists.id +"="+ id+"?")
    console.log(`CPF formatado: ${fucpf}`)

    const userData = {
      name, email, phone, password: newPassword, image, ucpf: fucpf
    }

    console.log(userData)

    try {
      const updatedUser = await User.update(userData, {
        where: {
          id
        }
      })
      console.log(updatedUser)
      res.status(200).json({
        message: "Usuário atualizado com sucesso."
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}