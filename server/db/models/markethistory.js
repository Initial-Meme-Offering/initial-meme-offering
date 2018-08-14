const Sequelize = require('sequelize')
const db = require('../db')

const MarketHistory = db.define('markethistory', {
  closingPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  seedDateDay: {
    type: Sequelize.DATE
  }
})

module.exports = MarketHistory
