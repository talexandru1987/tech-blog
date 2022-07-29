const { id } = require("date-fns/locale");
const path = require("path");

const { User, Blog, Comment } = require("../../models");

const renderHomePage = async (req, res) => {
  const allBlogs = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    attributes: ["id", "title", "description", "userId", "updatedAt"],
  });

  const allComments = await Comment.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    attributes: ["id", "commentText", "postId", "userId", "updatedAt"],
  });

  let commentList = allComments.map((comment) => {
    return comment.get({ plain: true });
  });

  let blogList = allBlogs.map((blog) => {
    return blog.get({ plain: true });
  });

  let blogCommentsList = blogList.map((blog) => {
    commentList.map((comment) => {
      //add and comment array for each object
      if (!blog.comments) {
        blog.comments = [];
      }
      //insert comments into array
      if (comment.postId === blog.id) {
        blog.comments.push(comment);
      }
    });
    return blog;
  });

  if (req.session.isLoggedIn) {
    return res.render("home", {
      isLoggedIn: req.session.isLoggedIn,
      data: blogCommentsList,
      key: req.session.user.id,
    });
  } else {
    return res.render("home", {
      isLoggedIn: req.session.isLoggedIn,
      data: blogCommentsList,
    });
  }
};

const renderLoginPage = (req, res) => {
  return res.render("login");
};

const renderSignupPage = (req, res) => {
  return res.render("signup");
};

const renderDashboardPage = async (req, res) => {
  const userBlogs = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    where: {
      userId: req.session.user.id,
    },
    attributes: ["id", "title", "description", "userId", "updatedAt"],
  });

  let userList = userBlogs.map((blog) => {
    return blog.get({ plain: true });
  });

  return res.render("dashboard", {
    data: userList,
    key: req.session.user.id,
  });
};

const renderPostUpdatePage = async (req, res) => {
  try {
    const { isLoggedIn } = req.session;
    const user = req.session.user;
    const { id } = req.params;
    const post = await Blog.findByPk(id);

    if (!post) {
      return res.render("Post not  found!");
    }
    const viewModel = post.get({ plain: true });
    return res.render("editPost", {
      isLoggedIn,
      data: viewModel,
      user,
      id,
    });
  } catch (error) {
    console.log(`${error.message}`);
    res.render("error");
  }
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderDashboardPage,
  renderPostUpdatePage,
};
