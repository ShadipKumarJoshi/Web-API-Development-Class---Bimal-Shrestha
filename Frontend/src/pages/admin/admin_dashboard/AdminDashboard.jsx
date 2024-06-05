import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createProductApi, deleteProduct, getAllProducts } from '../../../apis/api'

// 1. UI 
const AdminDashboard = () => {

  // X.1. Use state for all fetched products from backend
  const [products, setProducts] = useState([]) // array[]

  // X.2. Call API initially (Page load) - Set all fetch products to state (X.1.)
  useEffect(() => {

    getAllProducts().then((res) => {

      // response : res.data.products (All Products)
      setProducts(res.data.products)


    }).catch((error) => {
      console.log(error)

    })
  }, []) // [] is dependencies of useEffect ie . useEffect works only when [] is supplied
  console.log(products)


  //  2. use State define
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductcategory] = useState('')
  const [productDescription, setProducDescription] = useState('')
  // 2.1. useState for image
  const [productImage, setProductImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  // 3. image upload handler // can use e/event below
  const handleImage = (event) => { // can use e also instead of event
    const file = event.target.files[0]
    setProductImage(file) //for backend
    setPreviewImage(URL.createObjectURL(file)) // for temporary preview


  }

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(
    //   productName,
    //   productPrice,
    //   productCategory,
    //   productDescription,
    //   productImage
    // )

    // make a from-data (txt, file)
    const formData = new FormData()
    formData.append('productName', productName)
    formData.append('productPrice', productPrice)
    formData.append('productCategory', productCategory)
    formData.append('productDescription', productDescription)
    formData.append('productImage', productImage)

    // Make a api call
    createProductApi(formData).then((res) => {
      // if(res.data.success ===false){
      //   toast.error(res.data.message)
      // } else {
      //   toast.success(res.data.message)
      // }

      // For SUCCESSFUL API
      if (res.status === 201) {
        toast.success(res.data.message);
      }

    }).catch((error) => {
      // For ERROR status code
      if (error.response) {
        if (error.response.status === 400) {
          toast.warning(error.response.data.message)
        } else if (error.response.status === 500) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Something went wrong!")
        }

      } else {
        toast.error("Something went wrong!")
      }

    });

  };

  // handle delete product



  const handleDelete = (id) => {
    const confirmDialog = window.confirm("Are you sure you want to delete?");
    if (confirmDialog) {
      // calling API
      deleteProduct(id).then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);

          // reload
          window.location.reload();
        }

      }).catch((error) => {
        if (error.response.status === 500) {
          toast.error(error.response.data.message);
        }

      });

    }

  };

  return (
    <>
      <div className='container mt-3'>
        <div className='d-flex justify-content-between'>
          <h3>Admin Dashboard</h3>
          {/* <button className='btn btn-danger'>Add product</button> */}

          {/* modal from getbootstrap instead of button above*/}
          {/* <!-- Button trigger modal --> */}
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Product
          </button>

          {/* <!-- Modal --> */}
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Add a new product</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  {/* ... */}
                  {/* Form for product */}
                  <form action="">
                    <label>Product Name</label>
                    <input onChange={(e) => setProductName(e.target.value)} type='text' className='form-control' placeholder='Enter product name'></input>

                    <label className='mt-2'>Product Price</label>
                    <input onChange={(e) => setProductPrice(e.target.value)} type='number' className='form-control' placeholder='Enter product price'></input>

                    <label className='mt-2' >Choose Product Category</label>
                    <select onChange={(e) => setProductcategory(e.target.value)} className='form-control'>
                      <option value='plants'>Plants</option>
                      <option value='electronics'>Electronics</option>
                      <option value='toys'>Toys</option>
                      <option value='food'>Food</option>
                      <option value='furniture'>Furniture</option>
                    </select>


                    <label className='mt-2'>Product Description</label>
                    <textarea onChange={(e) => setProducDescription(e.target.value)} className='form-control' ></textarea>

                    <label className='mt-2'>Product Image</label>
                    <input onChange={handleImage} type='file' className='form-control' ></input>

                    {/* Image Preview for dynamic preview */}
                    {
                      previewImage && <img src={previewImage} alt="preview image" className='img-fluid rounded mt-2' /> // img-fluid fits the image
                    }


                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button onClick={handleSubmit} type="button" class="btn btn-primary">Save  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table mt-2">
          <thead className="table-dark">
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Product Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td><img width={'40px'} height={'40px'} src="https://th.bing.com/th/id/OIP.B0FHX_50PYZIN4QKsKykdAHaHa?w=172&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="" /></td>
              <td>Ninja Cat</td>
              <td>200</td>
              <td>Indoor</td>
              <td>Lorem Ipsum</td>
              <td>
                <button className='btn btn-primary'>Edit</button>
                <button className='btn btn-danger ms-2' >Delete</button>
              </td>
            </tr> */}

            {
              products.map((singleProduct) => (
                <tr>
                  <td><img width={'40px'} height={'40px'} src={`http://localhost:5000/products/${singleProduct.productImage}`} alt="" /></td>
                  <td>{singleProduct.productName}</td>
                  <td>{singleProduct.productPrice}</td>
                  <td>{singleProduct.productCategory}</td>
                  <td>{singleProduct.productDescription}</td>
                  <td>
                    {/* <button className='btn btn-primary'>Edit</button> */}

                    {/* LINK BUTTON TO RESPECTIVE EDIT PRODUCT */}
                    <Link to={`/admin/update/${singleProduct._id}`} className='btn btn-primary'>Edit</Link>
                    {/* <button className='btn btn-danger ms-2' >Delete</button> */}
                    <button onClick={() => handleDelete(singleProduct._id)} className='btn btn-danger ms-2' >Delete</button>
                  </td>
                </tr>
              ))
            }


          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminDashboard


// EDIT PRODUCT -------------------------------------------------
//  product is in Admin Dashboard (Table)
// Make a new route (Admin Edit Product)
// Fill all the related information of the chose product only.
// It must be editable( both text , file)
// make a backend to update product.

