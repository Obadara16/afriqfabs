const express =require("express")
const router = express.Router()
const {createOrder, updateOrderById, deleteOrderById, getOrdersByUserId, getAllOrders, getMonthlyIncome} = require('../controllers/orderController')
const { requireAuth,  requireAuthAndAdmin, requireAuthAndAuthorization } = require("../middlewares/requireAuth");



router.post('/', requireAuth, createOrder)
router.put('/:id', requireAuthAndAdmin, updateOrderById)
router.delete('/:id', requireAuthAndAdmin, deleteOrderById)
router.get('/find/:userId', requireAuthAndAuthorization, getOrdersByUserId)
router.get('/', requireAuthAndAdmin, getAllOrders)
router.get('/', requireAuthAndAdmin, getMonthlyIncome)


module.exports = router