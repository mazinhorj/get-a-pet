const Pet = require('../models/Pet')




module.exports = class PetController {


  static async add(req, res) {
    res.json({message: "Vem bicho aí"})
  }

}