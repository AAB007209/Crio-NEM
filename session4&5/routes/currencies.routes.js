const router = require("express").Router(); // Router is an interface of Express comes pre-built

const {
    getCurrencies,
    getCurrencyBySymbol,
} = require("../controllers/currencies.controllers");

router.get("/", getCurrencies);
router.get("/:symbol", getCurrencyBySymbol);

module.exports = router;