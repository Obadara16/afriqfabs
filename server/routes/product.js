const express =require("express")
const router = express.Router()
const {createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct, createProductReview, getProductReview, updateProductReview} = require('../controllers/productController')
const { requireAuth,  requireAuthAndAdmin } = require("../middlewares/requireAuth");



router.post('/', requireAuthAndAdmin, createProduct)
router.put('/:id', requireAuthAndAdmin, updateProduct)
router.delete('/:id', requireAuthAndAdmin, deleteProduct)
router.get('/find/:id', getSingleProduct)
router.get('/', getAllProducts)
router.post('/:id/reviews', requireAuth, createProductReview)
router.get('/:id/reviews',  getProductReview)
router.put(':productId/reviews/:reviewId', requireAuth,  updateProductReview)


module.exports = router