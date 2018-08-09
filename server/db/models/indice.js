const Sequelize = require('sequelize')
const db = require('../db')

const Indice = db.define('indice', {
    name: {
        type: Sequelize.STRING
    }
})

module.exports = Indice