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
    symbol: {
        type: Sequelize.STRING
    },
    totalStock: {
        type: Sequelize.INTEGER
    },
    isIndex: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Meme