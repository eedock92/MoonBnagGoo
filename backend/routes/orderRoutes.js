import express from 'express'
import { addOrderItems, 
         getOrderById, 
         updateOrderToPaid,
         updateOrderToDelivered,
         getMyOrders,
         getOrders
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const orderRouter = express.Router()

orderRouter.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
orderRouter.route('/myorders').get(protect, getMyOrders)
orderRouter.route('/:id').get(protect, getOrderById)
orderRouter.route('/:id/pay').get(protect, updateOrderToPaid)
orderRouter.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default orderRouter
