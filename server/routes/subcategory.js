const express = require('express');
const {
  createSubcategory, getSubcategories
} = require('../controllers/subCategoryController');
const { requireAuthAndAdmin } = require("../middlewares/requireAuth");

const router = express.Router();


router.post('/', requireAuthAndAdmin, createSubcategory);
router.get('/',  getSubcategories);

module.exports = router;
