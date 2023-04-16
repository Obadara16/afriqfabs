const express =require("express")
const router = express.Router()
const {createCart, getAllCarts, getCartById, updateCartById, deleteCartById} = require('../controllers/cartController')
const { requireAuth,  requireAuthAndAdmin } = require("../middlewares/requireAuth");



router.put('/', requireAuth, createCart)
router.put('/:id', requireAuth, updateCartById)
router.delete('/:id', requireAuth, deleteCartById)
router.get('/:userId', requireAuth, getCartById)
router.get('/', requireAuthAndAdmin, getAllCarts)


module.exports = router