const { Router } = require("express");

const router = Router();

const auth = require("../../middlewares/auth");

const { createComment } = require("../../controllers/api");

// router.put("/", auth, updatePostById);
// router.delete("/:id", auth, deletePostById);
router.post("/", auth, createComment);

module.exports = router;
