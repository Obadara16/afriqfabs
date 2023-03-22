const express =require("express")
const router = express.Router()
const {createCart, getAllCarts, getCartById, updateCartById, deleteCartById} = require('../controllers/cartController')
const { requireAuth,  requireAuthAndAdmin, requireAuthAndAuthorization } = require("../middlewares/requireAuth");



router.post('/', requireAuth, createCart)
router.put('/:id', requireAuthAndAuthorization, updateCartById)
router.delete('/:id', requireAuthAndAuthorization, deleteCartById)
router.get('/find/:userId', requireAuthAndAuthorization, getCartById)
router.get('/', requireAuthAndAdmin, getAllCarts)


module.exports = router