const Sequelize = require('sequelize')
const db = require('../db')

const UserComment = db.define('usercomment', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }   
})

module.exports = UserComment