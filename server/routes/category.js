const express = require('express');
const {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { requireAuth,  requireAuthAndAdmin, requireAuthAndAuthorization } = require("../middlewares/requireAuth");

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getSingleCategory);
router.post('/', requireAuthAndAdmin, createCategory);
router.put('/:id', requireAuthAndAdmin, updateCategory);
router.delete('/:id', requireAuthAndAdmin, deleteCategory);

module.exports = router;
