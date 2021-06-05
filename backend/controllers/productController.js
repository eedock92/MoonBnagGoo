import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


//@desc     Fetch All products
//@route    GET /api/products
//@access   Public 
const getProducts  = asyncHandler(async (req, res) => {

    //페이지
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1


    //검색 기능 추가
    const keyword = req.query.keyword ? { 
        name : {
            $regex : req.query.keyword,
            $options : 'i'
        }
    } : {}


    //카테고리 추가
    // const category = req.query.category ? {
    //     name : {
    //         $regex : req.query.category,
    //     }
    // } : {}



    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))


    if(products){
        res.json({ products, page, pages: Math.ceil(count / pageSize) })
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


//@desc     Create product
//@route    POST /api/products
//@access   Private/Admin 
const createProduct =  asyncHandler(async (req, res) => {
    console.log("createProduct")
    const product = new Product({
        name : '샘플 이름',
        price : 0,
        user : req.user._id,
        image : '/images/sample.jpg',
        brand : '샘플 브랜드',
        category : '샘플 카테고리',
        countInStock: 0,
        numReviews : 0,
        description : '샘플 상세설명'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
   
})


//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Private/Admin 
const updateProduct =  asyncHandler(async (req, res) => {
    console.log("updateProduct")
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)
    console.log(req.params.id)
    if(product){

        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
       
    }else{
        res.status(404)
        throw new Error('Product not found')
    }


})


//@desc     Delete product
//@route    DELETE /api/products/:id
//@access   Private/Admin 
const deleteProduct =  asyncHandler(async (req, res) => {
   
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({ message : 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
   
   
})


//@desc     Create new review
//@route    POST /api/products/:id/reviews
//@access   Private/Admin    
const createProductReview =  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    console.log("createProductReview")
    const product = await Product.findById(req.params.id)

    console.log(product)
    if(product){

        const alreadyReviewed = product.reviews.find(r => r.user.toString() === 
        req.user._id.toString())

        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name : req.user.name,
            rating : Number(rating),
            comment,
            user : req.user._id
        }

    
        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        console.log("prev data ")
        console.log(review.comment)
        console.log(review.name)
        await product.save()

        console.log("review")

        res.status(201).json({ message : 'Review added '})

    }else{
        res.status(404)
        throw new Error('Product not found')
    }


})


// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
   
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
   
    if(products){
    
        res.json(products)
     
    }else{

        res.status(404).json({ message : 'Products not found'})

    }
   
})


export {
        getProducts, 
        getProductById, 
        getTypeProducts,          
        createProduct, 
        updateProduct,
        deleteProduct,
        createProductReview,
        getTopProducts
        }