const User = require('./user')
const Meme = require('./meme')
const Offer = require('./offer')
const MemeStock = require('./meme-stock')
const Transaction = require('./transaction')
const UserComment = require('./user-comment')
const MemeIndice = require('./meme-indices')
const MarketHistory = require('./markethistory')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//MemeStock link to get User shares of a Meme
Meme.hasMany(MemeStock)
User.hasMany(MemeStock)
MemeStock.belongsTo(Meme)
MemeStock.belongsTo(User)

//Offers link for both buy and sell user offers
Meme.hasMany(Offer)
User.hasMany(Offer)
Offer.belongsTo(Meme)
Offer.belongsTo(User)

//Comments between Users and Memes
Meme.hasMany(UserComment)
User.hasMany(UserComment)
UserComment.belongsTo(Meme)
UserComment.belongsTo(User)

//Transactions link for completed transactions to their offers
Offer.belongsTo(Transaction)
Transaction.hasMany(Offer)
//Link to include Memes on Transactions table
Meme.hasMany(Transaction)
Transaction.belongsTo(Meme)

//creating a market history for each meme for the previous year
Meme.hasMany(MarketHistory)
MarketHistory.belongsTo(Meme)

//Link between Offers & Transactions
Offer.belongsToMany(Transaction, {through: 'offer-transactions'})
Transaction.belongsToMany(Offer, {through: 'offer-transactions'})

//Link between Memes & Indices
Meme.belongsToMany(Meme, {as: 'members', foreignKey: 'parentIndexId', through: 'meme-indices'})
Meme.belongsToMany(Meme, {as: 'indices', foreignKey: 'childMemeId', through: 'meme-indices'})

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
  UserComment,
  MemeIndice,
  MarketHistory
}
