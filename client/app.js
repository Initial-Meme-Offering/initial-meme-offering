import React from 'react'

import {Navbar, Footer} from './components'

import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <section className="section is-small">
        <Routes />
      </section>
      <Footer />
    </div>
  )
}

export default App
