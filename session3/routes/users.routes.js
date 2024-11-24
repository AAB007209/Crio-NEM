const router = require("express").Router(); // Router is an interface of Express comes pre-built

const {
    getUsers,
    getUserById,
    searchUsers,
} = require("../controllers/users.controllers");

router.get("/", getUsers);
router.get("/search", searchUsers); // Always needs to be on top before the dynamic values as below
router.get("/:uuid", getUserById);

module.exports = router;