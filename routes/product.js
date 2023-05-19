const express = require("express");
const products = require("../controllers/product.js")

const router = express.Router();

router.get('/products', products.getAll);
router.get('/products/:id_product', products.getId);
router.post('/products', products.create);
router.put('/products/:id_product', products.update);
router.delete('/products/:id_product', products.destroy);

module.exports = router;