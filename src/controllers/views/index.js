const path = require("path");

const { User, Blog } = require("../../models");

const renderHomePage = async (req, res) => {
  // const playlistsFromDb = await Playlist.findAll({

  //   include: [
  //     {
  //       model: User,
  //       attributes: ["firstName", "lastName"],
  //     },
  //     {
  //       model: PlaylistSong,
  //       as: "songs",
  //     },
  //   ],
  //   attributes: ["id", "title", "imageUrl", "createdAt"],
  // });

  // const playlists = playlistsFromDb.map((playlist) => {
  //   return playlist.get({ plain: true });
  // });

  // return res.render("home", {
  //   isLoggedIn: req.session.isLoggedIn,
  //   currentPage: "home",
  //   playlists,
  // });

  return res.render("home");
};

const renderLoginPage = (req, res) => {
  return res.render("login");
};

const renderSignupPage = (req, res) => {
  return res.render("signup");
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderSignupPage,
};
