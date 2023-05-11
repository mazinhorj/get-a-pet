const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const PetImage = require('./PetImage')
const User = require('./User')


const Pet = db.define('Pet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  age: {
    type: DataTypes.STRING,
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
  available: {
    type: DataTypes.BOOLEAN,
  },
});

Pet.hasMany(PetImage, { foreignKey: 'petId' });
Pet.belongsTo(PetImage, {as: 'profilepetpic', constraints: false});



module.exports = Pet;