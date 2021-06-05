import express from 'express'
const productRouter = express.Router()
import {getProducts, 
        getProductById, 
        getTypeProducts, 
        deleteProduct,
        updateProduct,
        createProduct,
        createProductReview,
        getTopProducts
        } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

productRouter.route('/').get(getProducts).post(protect, admin, createProduct)
productRouter.route('/:id/reviews').post(protect ,createProductReview)
productRouter.get('/top', getTopProducts)
productRouter.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)
productRouter.route('/:type').get(getTypeProducts)



export default productRouter