const { User, Blog, Comment } = require("../../models");

const updatePostById = async (req, res) => {
  try {
    const { title, description, postId } = req.body;

    const post = await Blog.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!title && !description) {
      return res.status(500).json({ message: "Title and description cannot be blank" });
    }

    await Blog.update({ title, description }, { where: { id: postId } });
    return res.status(200).json({ message: "Post updated" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Blog.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Blog.destroy({ where: { id } });
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    if (!title && !postText) {
      return res.status(400).json({ message: "Unable to create post" });
    }

    const newPost = await Blog.create({ title, description, userId });
    return res.status(200).json({ message: "New post created", newPost: newPost });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const createComment = async (req, res) => {
  console.log("Creating comment");

  try {
    const { commentText, postId } = req.body;
    const userId = req.session.user.id;

    console.log(userId);
    if (!commentText) {
      return res.status(400).json({ message: "Unable to create comment" });
    }

    const newComment = await Comment.create({ commentText, userId, postId });
    return res.status(200).json({ message: "New comment created", newComment: newComment });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

const updateCommentById = async (req, res) => {
  try {
    const { commentText, commentId } = req.body;

    const post = await Comment.findByPk(commentId);

    if (!post) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!commentText) {
      return res.status(500).json({ message: "Comment cannot be blank" });
    }

    await Comment.update({ commentText }, { where: { id: commentId } });
    return res.status(200).json({ message: "Comment updated" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
};

module.exports = {
  updatePostById,
  deletePostById,
  createPost,
  createComment,
  updateCommentById,
};
