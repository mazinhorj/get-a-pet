const { DataTypes } = require('sequelize');
const db = require('../db/conn');

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
  image: {
    type: DataTypes.ARRAY,
    required: true
  },
  available: {
    type: DataTypes.BOOLEAN,
  },
  user: Object,
  adopter: Object
});

module.exports = Pet;