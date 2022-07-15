const { Router } = require("express");

const auth = require("./auth");
const views = require("./views");

const router = Router();

router.use("/auth", auth);
router.use("/", views);

module.exports = router;
