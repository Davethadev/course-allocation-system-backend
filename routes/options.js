const express = require("express");
const router = express.Router();
const { getOptions } = require("../controllers/options");

router.route("/").get(getOptions);

module.exports = router;
