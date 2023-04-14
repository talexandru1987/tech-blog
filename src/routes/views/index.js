const { Router } = require("express");

const {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderDashboardPage,
  renderPostUpdatePage,
  renderCommentUpdatePage,
} = require("../../controllers/views");
const auth = require("../../middlewares/auth");

const router = Router();

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);
router.get("/dashboard", auth, renderDashboardPage);
router.get("/update/:id", auth, renderPostUpdatePage);
router.get("/comment/:id", auth, renderCommentUpdatePage);

module.exports = router;
