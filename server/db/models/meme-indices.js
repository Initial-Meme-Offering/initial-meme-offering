const Sequelize = require('sequelize')
const db = require('../db')

const MemeIndice = db.define('meme-indices', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  }
})

module.exports = MemeIndice
