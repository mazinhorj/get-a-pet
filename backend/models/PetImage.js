const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const PetImage = db.define('Image', {

  petpic: {
    type: DataTypes.STRING
  }

});

module.exports = PetImage