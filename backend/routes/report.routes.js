const router = require("express").Router();
const reportController = require("../controllers/report.controller");
const { auth } = require("../utils/middlewares");

router.route("/").post(reportController.createReport);
router.route("/").get(auth, reportController.getReport);

module.exports = router;
