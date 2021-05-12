import express from 'express'
const productRouter = express.Router()
import {getProducts, getProductById, getTypeProducts} from '../controllers/productController.js';


productRouter.route('/').get(getProducts)
productRouter.route('/:id').get(getProductById)
productRouter.route('/:type').get(getTypeProducts)



export default productRouter