const { Router } = require("express");

const router = Router();

const auth = require("../../middlewares/auth");

const { deletePostById, updatePostById } = require("../../controllers/api");

router.put("/:id", auth, updatePostById);
router.delete("/:id", auth, deletePostById);

module.exports = router;
