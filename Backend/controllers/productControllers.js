const path = require('path')
const productModel = require('../models/productModel')
const createProduct = async (req, res) => {
    // res.send("Create product API is working...")

    // Check incoming data // form data // not raw data
    // npm install express-fileupload
    console.log(req.body)
    console.log(req.files)

    // Destructuring the body data (json)
    const { productName,
        productPrice,
        productCategory,
        productDescription
    } = req.body;

    // Validation
    if (!productName || !productPrice || !productCategory || !productDescription) {
        return res.status(400).json({
            "success": false,
            "message": "Enter all fields!"
        })
    }

    // validate for image
    if (!req.files || !req.files.productImage) {
        return res.status(400).json({
            "success": false,
            "message": "Image not found!"
        })
    }
    const { productImage } = req.files;

    // Upload image
    // 1. Generate new unique image name (abc.png) -> (213456-abc.png)
    const imageName = `${Date.now()}-${productImage.name}`

    // 2. Make an upload path (/path/upload - directory)
    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)    // 2 underscores __directory name, then make a public folder with products

    // 3. Move to that directory (await for background upload, try-catch  for internet crashes)
    try {
        await productImage.mv(imageUploadPath) // mv is move
        // res.send("Image Uploaded Successfully!")

        // Save to database
        const newProduct = new productModel({
            productName: productName,
            productPrice: productPrice,
            productCategory: productCategory,
            productDescription: productDescription,
            productImage: imageName // product iumage is imageName that is changed as a unique name
        })
        const product = await newProduct.save() // it takes time to save to database
        res.status(201).json({
            "success": true,
            "message": "Product Created Successfuly!",
            "data": product
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal Server Error!",
            "error": error
        })

    }


};


// Fetch all products
const getAllProducts = async (req,res) => {
    // try catch
    try {
        const allProducts = await productModel.find({})
        res.status(201).json({
            "success": true,
            "message": "Product Fetched Successfully!",
            "products": allProducts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success" :false,
            "message": "Internal server error!",
            "error": error
        })
        
    }
    // Fetch ALL products
    // Send Response


}

// Fetch single product
const getSingleProduct = async(req,res) => {

    // get product id of editable product from URL (params) 
    const productId = req.params.id;

    // Find the product from id
    try {
        const product = await productModel.findById(productId)
        if (!product) {
            res.status(400).json({
                "success": false,
                "message": "No product found!",})
                
        }
        res.status(201).json({
            "success": true,
            "message": "Product Fetched Successfully!",
            "products": product
        })
        
    } catch (error) {
        res.status(500).json({
            "success" :false,
            "message": "Internal server error!",
            "error": error })
    }

}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct
}