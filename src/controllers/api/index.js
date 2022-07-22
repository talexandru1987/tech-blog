const { User, Blog } = require("../../models");

const updatePostById = async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const post = await Blog.findByPk(id);
  //   if (!post) {
  //     return res.status(404).json({ message: "Post not found" });
  //   }
  //   const { title, postText } = req.body;
  //   if (!title && !postText) {
  //     return res.status(500).json({ message: "Unable to update post" });
  //   }
  //   await Post.update({ title, postText }, { where: { id } });
  //   return res.status(200).json({ message: "Post updated" });
  // } catch (error) {
  //   console.error(`ERROR | ${error.message}`);
  //   return res.status(500).json(error);
  // }
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

module.exports = {
  updatePostById,
  deletePostById,
};
