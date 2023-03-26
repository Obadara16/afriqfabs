const express =require("express")
const router = express.Router()
const {
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    getUserStats,
  } = require('../controllers/userController')
const { requireAuthAndAuthorization, requireAuthAndAdmin } = require("../middlewares/requireAuth")


router.put('/:id', requireAuthAndAuthorization, updateUser)
router.delete('/:id', requireAuthAndAuthorization, deleteUser)
router.get("/find/:id", requireAuthAndAdmin, getUserById)
router.get("/", requireAuthAndAdmin, getAllUsers)
router.get("/stats", requireAuthAndAdmin, getUserStats)



module.exports = router