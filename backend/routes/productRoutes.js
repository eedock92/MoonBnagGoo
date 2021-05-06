import express from 'express'
import {getAllProducts, getSingleProducts, getTypeProducts} from '../controllers/productController.js';
const productRouter = express.Router()

//@desc     Fetch All products
//@route    GET /api/products
//@access   Public 
productRouter.get('/', getAllProducts )

//@desc     Fetch single products
//@route    GET /api/products/:id
//@access   Public 
productRouter.get('/:id', getSingleProducts )


//@desc     Fetch type products
//@route    GET /api/products/type
//@access   public
productRouter.get('/:type', getTypeProducts)


export default productRouter