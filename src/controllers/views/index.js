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
    blogList.key = req.session.user.id;
  }
  console.log(blogList);

  return res.render("home", { isLoggedIn: req.session.isLoggedIn, data: blogList });
};

const renderLoginPage = (req, res) => {
  return res.render("login");
};

const renderSignupPage = (req, res) => {
  return res.render("signup");
};

const renderDashboardPage = (req, res) => {
  return res.render("dashboard");
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderDashboardPage,
};
