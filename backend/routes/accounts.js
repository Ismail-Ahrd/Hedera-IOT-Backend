const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
router.post("/", accountController.createNewAccount);

// router.get("/:postId", postController.getPostImages);

module.exports = router;
