const { Router } = require("express");

const {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
  renderDashboardPage,
} = require("../../controllers/views");
const auth = require("../../middlewares/auth");

const router = Router();

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);
router.get("/dashboard", auth, renderDashboardPage);
// router.get("/create-playlist", auth, renderCreatePlaylistPage);
// router.get("/playlists/:id", auth, renderPlaylistPage);
// router.get("/explore", auth, renderExplorePage);

module.exports = router;
