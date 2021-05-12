import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


//@desc     Fetch All products
//@route    GET /api/products
//@access   Public 
const getProducts  = asyncHandler(async (req, res) => {
    
    const products = await Product.find({})


    if(products){
        res.status(200).json(products)
    }else{
        res.status(404).json({ message : 'Products not found'})
    }
  
})

//@desc     Fetch single products
//@route    GET /api/products/:id
//@access   Public 
const getProductById =  asyncHandler(async (req, res) => {
   
    const product = await Product.findById(req.params.id)

    if(product) {
        res.status(200).json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
   
   
})

//@desc     Fetch type products
//@route    GET /api/products/type
//@access   public
const getTypeProducts = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.type)

    if(product) {
        res.status(200).json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getProducts, getProductById, getTypeProducts}