const Sequelize = require('sequelize')
const db = require('../db')

const MemeStock = db.define('memestock', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }   
})

module.exports = MemeStock