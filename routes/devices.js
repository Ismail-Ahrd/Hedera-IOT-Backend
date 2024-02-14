const express = require("express");
const deviceController = require("../controllers/deviceController");
const router = express.Router();

router.get("/", deviceController.getDevices);
router.get("/balance", deviceController.getDevicesByAccountId);
router.post("/", deviceController.getDevices);


// router.get("/:postId", postController.getPostImages);

module.exports = router;
