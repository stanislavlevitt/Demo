import React from 'react'
import {Link} from 'react-router-dom'

export const AdminPage = () => {
  return (
    <div className="single-product-div">
      <h1>Admin Page</h1>
      <Link to="/allUsers">All Users</Link>
      <br />
      <Link to="/products">All Products</Link>
    </div>
  )
}

export default AdminPage

