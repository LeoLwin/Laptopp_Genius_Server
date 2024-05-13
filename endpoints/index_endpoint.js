const router = require("express").Router();

const product = require("./products_endpoint");
const advertising = require("./advertising_endpoint");

router.use("/product", product);
router.use("/advertising", advertising);

module.exports = router;
