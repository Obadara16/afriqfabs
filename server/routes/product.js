const express =require("express")
const router = express.Router()
const {createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct, createProductReview, getProductReview, updateProductReview, getRelatedProducts, getFeaturedProducts} = require('../controllers/productController')
const { requireAuth,  requireAuthAndAdmin } = require("../middlewares/requireAuth");
const upload = require("../middlewares/multer")



router.post('/', requireAuthAndAdmin, upload.single('img'), createProduct)
router.put('/:id', requireAuthAndAdmin, updateProduct)
router.delete('/:id', requireAuthAndAdmin, deleteProduct)
router.get('/find/:slug', getSingleProduct)
router.get('/', getAllProducts)
router.get('/related', getRelatedProducts)
router.get('/featured', getFeaturedProducts)
router.post('/:id/reviews', requireAuth, createProductReview)
router.get('/:id/reviews',  getProductReview)
router.put('/:productId/reviews/:id', requireAuth,  updateProductReview)


module.exports = router