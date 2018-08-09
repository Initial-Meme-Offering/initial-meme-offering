const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
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
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  validate: {
    
  }
})

Transaction.beforeCreate((transaction, options))

module.exports = Transaction
