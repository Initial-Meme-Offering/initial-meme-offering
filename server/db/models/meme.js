const Sequelize = require('sequelize')
const db = require('../db')

const Meme = db.define('meme', {
    name: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'review',
        validate: {
            isIn: [['review', 'offering', 'released']]
        }
    },
    totalStock: {
        type: Sequelize.INTEGER
    }
})

module.exports = Meme