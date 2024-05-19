import React from 'react'

const AdminDashboard = () => {
  return (
    <>
      <div className='container mt-3'>
        <div className='d-flex justify-content-between'>
          <h3>Admin Dashboard</h3>
          <button className='btn btn-danger'>Add product</button>
        </div>
        <table class="table">
          <thread class="table-dark">
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Product Description</th>
              <th>Actions</th>
            </tr>
          </thread>
          <tbody>
            <tr>
              <td><img width={'10%'} src="https://th.bing.com/th/id/OIP.B0FHX_50PYZIN4QKsKykdAHaHa?w=172&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="" /></td>
              <td>Ninja Cat</td>
              <td>500</td>
              <td>Indoor</td>
              <td>Lorem Ipsum</td>
              <td>
                <button className='btn btn-primary'>Edit</button>
                <button className='btn btn-danger ms-2' >Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminDashboard


