const express =require("express")
const router = express.Router()
const {createDesign, getAllDesigns, getSingleDesign, deleteDesign, updateDesign} = require('../controllers/designController')
const { requireAuth,  requireAuthAndAdmin } = require("../middlewares/requireAuth");
const upload = require("../middlewares/multer")



router.post('/', requireAuthAndAdmin, upload.single('img'), createDesign)
router.put('/:id', requireAuthAndAdmin, updateDesign)
router.delete('/:id', requireAuthAndAdmin, deleteDesign)
router.get('/find/:slug', getSingleDesign)
router.get('/', getAllDesigns)


module.exports = router