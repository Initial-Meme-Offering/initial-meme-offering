const router = require('express').Router()
const {Transaction} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({})
    res.json(transactions)
  } catch (err) {
    next(err)
  }
})

// router.get('/:memeId', async (req, res, next) => {
//   try {
//     const transactions = await Transaction.findAll({
//       where: {
//         memeId: req.params.memeId
//       }
//     })
//   } catch (err) {
//     next(err)
//   }
// })
