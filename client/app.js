import React from 'react'

import {Navbar, Footer} from './components'

import Routes from './routes'

const App = () => {
  return (
    <div id="app">
      <Navbar />
      {/* <section className="section is-small"> */}
      <Routes />
      {/* </section> */}
      <Footer />
    </div>
  )
}

export default App
