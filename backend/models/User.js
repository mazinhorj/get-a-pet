const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  image: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING,
    required: true
  },
  ucpf: {
    type: DataTypes.STRING,
    required: true
  }
});

module.exports = User;