const User = require('./user')
const Meme = require('./meme')
const Offer = require('./offer')
const MemeStock = require('./meme-stock')
const Transaction = require('./transaction')
const Indice = require('./indice')
const UserComment = require('./user-comment')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 //MemeStock link to get User shares of a Meme
Meme.belongsToMany(User, {through: MemeStock})
User.belongsToMany(Meme, {through: MemeStock})

//Offers link for both buy and sell user offers
Meme.belongsToMany(User, {through: Offer})
User.belongsToMany(Meme, {through: Offer})

//Comments between Users and Memes
Meme.belongsToMany(User, {through: UserComment})
User.belongsToMany(Meme, {through: UserComment})

//Transactions link for completed transactions between two users
User.belongsToMany(User, {as: 'buyer', foreignKey: 'buyUserId', through: Transaction})
User.belongsToMany(User, {as: 'seller', foreignKey: 'sellUserId', through: Transaction})
//Link to include Memes on Transactions table
Meme.belongsTo(Transaction)
Transaction.hasMany(Meme)

//Link between Offers & Transactions
Offer.belongsToMany(Transaction, {through: 'offer-transactions'})
Transaction.belongsToMany(Offer, {through: 'offer-transactions'})

//Link between Memes & Indices
Meme.belongsToMany(Indice, {through: 'meme-indices'})
Indice.belongsToMany(Meme, {through: 'meme-indices'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

 module.exports = {
  User,
  Meme,
  Offer,
  Transaction,
  MemeStock,
  Indice
}
