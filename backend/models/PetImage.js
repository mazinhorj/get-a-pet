const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Image = db.define('Image', {

  petpic: {
    type: DataTypes.STRING,
    allowNull: false,
  }

});

module.exports = Image