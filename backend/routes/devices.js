const express = require("express");
const deviceController = require("../controllers/deviceController");
const router = express.Router();

router.get("/", deviceController.getDevices);
router.get("/balance", deviceController.getDevicesByAccountId);
router.post("/", deviceController.addDevice);

// router.get("/:postId", postController.getPostImages);

module.exports = router;
