const { User, Blog } = require("../../models");

const updatePostById = async (req, res) => {
  try {
    const { title, description, postId } = req.body;

    console.log(req.body);
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
  console.log("delete post");
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

module.exports = {
  updatePostById,
  deletePostById,
  createPost,
};
