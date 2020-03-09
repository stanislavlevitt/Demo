import React from 'react'

const UpdateUserForm = props => {
  const {handleSubmit, handleChange, name, email, address, stock} = props
  return (
    <form
      className="UpdateProductForm"
      method="POST"
      action="/"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">User Name</label>
      <input
        className="ProductFormInput"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <label htmlFor="imageUrl">User Email</label>
      <input
        className="ProductFormInput"
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <label htmlFor="price">User Address</label>
      <input
        className="ProductFormInput"
        type="text"
        name="address"
        value={address}
        onChange={handleChange}
      />
      <button
        disabled={name === '' || email === ''}
        className="ButtonUpdateProduct ProductFormLabel"
        type="submit"
      >
        Update User
      </button>
    </form>
  )
}

export default UpdateUserForm
