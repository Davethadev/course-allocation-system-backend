const express = require("express");
const router = express.Router();

const { getTotal } = require("../controllers/dashboard");

router.route("/").get(getTotal);

module.exports = router;
