const { Router } = require("express");

const posts = require("./posts");

const router = Router();

router.use("/posts", posts);

module.exports = router;
