const { Router } = require("express");

const router = Router();

const auth = require("../../middlewares/auth");

const { createComment, updateCommentById } = require("../../controllers/api");

router.put("/", auth, updateCommentById);
// router.delete("/:id", auth, deletePostById);
router.post("/", auth, createComment);

module.exports = router;
