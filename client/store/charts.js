export const getTransactionsByMemeId = id => dispatch => {
  axios
    .get(`/api/memeStocks/chart/${memeId}`)
    .then(({data}) => dispatch(gotTransactionsById(data)))
    .catch(error => console.error(error))
}
