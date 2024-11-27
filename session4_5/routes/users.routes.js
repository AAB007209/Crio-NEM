const router = require("express").Router(); // Router is an interface of Express comes pre-built

const {
    getUsers,
    getUserById,
    searchUsers,
} = require("../controllers/users.controllers");
const queryValidator = require("../middleware/queryValidator");
const verifyAuth = require("../middleware/verifyAuth");

// I can apply verifyAuth to all three route using below and then not need to again call in their routes
// router.use(verifyAuth);

router.get("/", verifyAuth, getUsers);

// first verifyAuth will be called and then the queryValidator is called and then if everything is correct the data is fetched for the searchUsers.
router.get("/search", verifyAuth, queryValidator, searchUsers); // Always needs to be on top before the dynamic values (/:uuid) as below
router.get("/:uuid", getUserById);

module.exports = router;

// - Learnings
/*
- Here the next() of the verifyAuth middleware function would be the next route below the getUsers which is searchUsers function and so on.

*/