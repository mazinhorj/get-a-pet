const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const PetImage = require('./PetImage')

const Pet = db.define('Pet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true
  },
  color: {
    type: DataTypes.STRING,
    required: true
  },
  // images: {
  //   type: DataTypes.JSON
  // },
  available: {
    type: DataTypes.BOOLEAN,
  },
  
  // user: Object,
  // adopter: Object
});

Pet.hasMany(PetImage);
Pet.belongsTo(PetImage, {as: 'ProfilePetPic', constraints: false});

module.exports = Pet;