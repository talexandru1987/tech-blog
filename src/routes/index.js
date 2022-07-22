const { Router } = require("express");

const auth = require("./auth");
const views = require("./views");
const api = require("./api");

const router = Router();

router.use("/auth", auth);
router.use("/", views);
router.use("/api", api);

module.exports = router;
