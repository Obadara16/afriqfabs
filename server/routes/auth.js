const express =require("express")
const router = express.Router()
const {loginUser, registerUser, verifyEmail, changePassword, resetPassword, forgotPassword, refreshTokens} = require('../controllers/authController')
const {requireAuthAndAuthorization} = require("../middlewares/requireAuth")

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/refresh-token', refreshTokens)
router.get('/verify-email/:verificationCode', verifyEmail);
router.put('/:id/change-password', requireAuthAndAuthorization ,changePassword)// Route for resetting password
router.post('/reset-password/:resetToken', resetPassword);
router.post('/forgot-password', forgotPassword);


module.exports = router