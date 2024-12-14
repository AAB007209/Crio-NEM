const router = require("express").Router();
const { registerUser, getAllUsers, getUserByUsername } = require("../controllers/users.controllers");
const verifyApiKey = require("../middlewares/verifyApiKey");
const { validateUser } = require("../middlewares/userValidate")

router.get("/all", verifyApiKey, getAllUsers);
router.post("/register", validateUser, registerUser);
router.get("/:username", getUserByUsername);

module.exports = router;