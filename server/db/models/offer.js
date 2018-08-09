const Sequelize = require('sequelize')
const db = require('../db')

const Offer = db.define('offer', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    offerType:  {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['buy', 'sell']]
      }
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pending',
      validate: {
        isIn: [['Pending', 'Complete']]
      }
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
})

module.exports = Offer