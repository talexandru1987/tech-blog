const { id } = require("date-fns/locale");
const path = require("path");

const { User, Blog } = require("../../models");

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

  let blogList = allBlogs.map((blog) => {
    return blog.get({ plain: true });
  });

  if (req.session.isLoggedIn) {
    return res.render("home", {
      isLoggedIn: req.session.isLoggedIn,
      data: blogList,
      key: req.session.user.id,
    });
  } else {
    return res.render("home", {
      isLoggedIn: req.session.isLoggedIn,
      data: blogList,
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
    const post = await dataProvider.getFullPost(id);
    const viewModel = post.get({ plain: true });

    return res.render("editPost", {
      isLoggedIn,
      data: viewModel,
      user: user,
    });
  } catch (error) {
    console.log(`${error.message}`);
    res.render("error");
  }

  // return res.render("editPost");
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderDashboardPage,
  renderPostUpdatePage,
};
