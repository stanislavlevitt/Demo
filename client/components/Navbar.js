import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = props => {
    return (
      <div>
          <nav>
            <div>
              <Link to="/">Home Page</Link>
              <Link to="/clients">All Clients</Link>
              <Link to="/cashFlow">Cash Flow</Link>
            </div>
          </nav>
      <hr />
      </div>
    )
}


export default Navbar


