const {transactionsdata} = require('./seedData3')

transactionsdata.sort((transaction1, transaction2) => {
    const date1 = new Date(transaction1.seedDate)
    const date2 = new Date(transaction2.seedDate)
    return date2 - date1
})

console.log(transactionsdata)