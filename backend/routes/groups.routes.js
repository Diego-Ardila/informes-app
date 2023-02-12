const router = require("express").Router();
const groupController = require("../controllers/groups.controller");
const { auth } = require("../utils/middlewares");

router.route("/").post(groupController.createGroup);
router.route("/").get(groupController.getGroups);

module.exports = router;
