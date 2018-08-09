const {expect} = require('chai')
const db = require('../index')

const {User, Meme, Offer, Transaction, MemeStock, Indice, UserComment} = require('./index')

describe('MemeStock model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('autoincrement', () => {
      let memestock1, memestock2, memestock3

      beforeEach(async () => {
        memestock1 = await MemeStock.create({
          quantity: 10
        })
        memestock2 = await MemeStock.create({
          quantity: 10
        })
        memestock3 = await MemeStock.create({
          quantity: 10
        })
      })

      it('returns true if it increments the id', () => {
        expect(memestock1.id).to.be.equal(1)
        expect(memestock2.id).to.be.equal(2)
        expect(memestock3.id).to.be.equal(3)
      })
    }) // end describe('increments id')
    describe('allowNull', () => {
      it('`name` is required', async () => {
        try {
          const memestock1 = await MemeStock.create({})
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })
    })
  }) // end describe('validations')
}) // end describe('MemeStock model')

describe('Meme model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('allowNull', () => {
      it('`status` is required', async () => {
        try {
          const meme = await Meme.create({
            name: 'test',
            desc: 'definitely a meme',
            totalStock: 10
          })
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })
      it('must be in one of the three Meme statuses', async () => {
        try {
          const meme = await Meme.create({
            name: 'test',
            desc: 'definitely a meme',
            status: 'status',
            totalStock: 10
          })
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })
    })
  }) // end describe('validations')
}) // end describe('Meme model')

describe('Offer model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('allowNull', () => {
      it('`offerType` is required', async () => {
        try {
          const offer = await Offer.create({
            quantity: 7,
            price: 15
          })
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })

      it('must be in one of the three offerType statuses', async () => {
        try {
          const offer = await Offer.create({
            offerType: 'status',
            quantity: 10,
            price: 7
          })
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })

      it('must be in one of the 2 statuses', async () => {
        try {
          const offer = await Offer.create({
            offerType: 'buy',
            status: 'definitely',
            quantity: 10,
            price: 7
          })
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })

      it('`quantity` is requried', async () => {
        try {
          const offer = await Offer.create({
            offerType: 'buy',
            status: 'Pending',
            price: 7
          })
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })

      it('`price` is requried', async () => {
        try {
          const offer = await Offer.create({
            offerType: 'buy',
            status: 'Pending',
            quantity: 7
          })
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })
    })
  }) // end describe('validations')
}) // end describe('Offer model')

describe('Transaction model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('autoincrement', () => {
    let transaction1, transaction2, transaction3

    beforeEach(async () => {
      transaction1 = await Transaction.create({
        quantity: 10,
        price: 7
      })
      transaction2 = await Transaction.create({
        quantity: 10,
        price: 8
      })
      transaction3 = await Transaction.create({
        quantity: 10,
        price: 11
      })
    })

    it('returns true if it increments the id', () => {
      expect(transaction1.id).to.be.equal(1)
      expect(transaction2.id).to.be.equal(2)
      expect(transaction3.id).to.be.equal(3)
    })
  }) // end describe('increments id')

  describe('validations', () => {
    describe('allowNull', () => {
      it('`price` is required', async () => {
        try {
          const transaction1 = await Transaction.create({
            quantity: 7
          })
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })

      it('`quantity` is required', async () => {
        try {
          const transaction1 = await Transaction.create({
            price: 7
          })
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })
    })
  }) // end describe('validations')
}) // end describe('Offer model')


describe('UserComment model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('autoincrement', () => {
    let comment1, comment2, comment3

    beforeEach(async () => {
      comment1 = await UserComment.create({
        text: 'woiejfaijs;odfijea'
      })
      comment2 = await UserComment.create({
        text: 'woiejfaijs;odfijea'
      })
      comment3 = await UserComment.create({
        text: 'woiejfaijs;odfijea'
      })
    })

    it('returns true if it increments the id', () => {
      expect(comment1.id).to.be.equal(1)
      expect(comment2.id).to.be.equal(2)
      expect(comment3.id).to.be.equal(3)
    })
  }) // end describe('increments id')

  describe('validations', () => {
    describe('allowNull', () => {
      it('`text` is required', async () => {
        try {
          const comment1 = await UserComment.create({
          })
        } catch (err) {
          expect(err.name).to.eql('SequelizeValidationError')
        }
      })
    })
  }) // end describe('validations')
}) // end describe('Offer model')
