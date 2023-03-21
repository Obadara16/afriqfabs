const express =require("express")
const router = express.Router()
const {
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers,
    getUserStats,
    changePassword,
  } = require('../controllers/userController')
const { requireAuthAndAuthorization, requireAuth } = require("../middlewares/requireAuth")


router.put('/:id', requireAuthAndAuthorization, updateUser)
router.delete('/:id', requireAuthAndAuthorization, deleteUser)
router.put('/changepassword', requireAuthAndAuthorization ,changePassword)
router.get("/find/:id", requireAuthAndAdmin, getUserById)
router.get("/", requireAuthAndAdmin, getAllUsers)
router.get("/stats", requireAuthAndAdmin, getUserStats)



module.exports = router