const Sequelize = require('sequelize')
const db = require('../db')

const Meme = db.define('meme', {
    name: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.TEXT
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'review',
        validate: {
            isIn: [['review', 'offering', 'released', 'removed']]
        }
    },
    totalStock: {
        type: Sequelize.INTEGER
    }
})

module.exports = Meme