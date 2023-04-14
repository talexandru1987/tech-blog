const { Router } = require("express");

const router = Router();

const auth = require("../../middlewares/auth");

const { createComment, updateCommentById, deleteCommentById } = require("../../controllers/api");

router.put("/", auth, updateCommentById);
router.delete("/:id", auth, deleteCommentById);
router.post("/", auth, createComment);

module.exports = router;
