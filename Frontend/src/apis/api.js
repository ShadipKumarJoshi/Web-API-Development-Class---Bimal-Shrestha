import axios from "axios";

// Creating backend Config!
const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        // "Content-Type": "application/json"
        "Content-Type": "multipart/form-data"

        // authorisation here means all can see the admin data
        // 'authorization'
    }
})

// make a config for admin authorisation
const config ={
    headers: {
        'authorization' : `Bearer ${localStorage.getItem('token')}`,
    }
}

// Test API
export const testApi = () => Api.get('/test') // same as in backend  /test

// Register API
export const registerUserApi = (data) => Api.post('/api/user/create', data) // (data) from frontend is received and sent to data in backend

// Login API
export const loginUserApi = (data) => Api.post('/api/user/login', data)

// Create product API
export const createProductApi = (data) => Api.post('/api/product/create', data)

// Get all products Api
// export const getAllProducts = () => Api.get('/api/product/get_all_products')
export const getAllProducts = () => Api.get('/api/product/get_all_products',config)

// get single product  APi {ID is important} / use tilde 
// export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`)
export const getSingleProduct = (id) => Api.get(`/api/product/get_single_product/${id}`, config)

// delete single product  APi {ID is important} / use tilde 
export const deleteProduct = (id) => Api.delete(`/api/product/delete_product/${id}`)

// update product
export const updateProduct = (id,data) => Api.put(`/api/product/update_product/${id}`,data) // form data is also going / update

// http://localhost:5000/test
