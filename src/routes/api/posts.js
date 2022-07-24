const { Router } = require("express");

const router = Router();

const auth = require("../../middlewares/auth");

const { deletePostById, updatePostById, createPost } = require("../../controllers/api");

router.put("/", auth, updatePostById);
router.delete("/:id", auth, deletePostById);
router.post("/", auth, createPost);

module.exports = router;
