const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const Pet = require('./Pet')

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
  phone: {
    type: DataTypes.STRING,
    required: true
  },
  ucpf: {
    type: DataTypes.STRING,
    required: true
  },
  image: {
    type: DataTypes.STRING
  }
});

User.hasMany(Pet);
// Pet.belongsTo(User, { as: 'adopter', constraints: false });


module.exports = User;