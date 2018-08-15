import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            Memonomics is to sole property of Barnacles Inc.<br />
            <br />
            <Link to="/privacypolicy">Privacy Policy |</Link>
            <Link to="/termsofservice"> Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
