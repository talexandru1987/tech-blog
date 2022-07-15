const { User } = require("../../models");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ where: { userName } });

    if (!user) {
      console.log(`[ERROR]: Failed to login | No user found with email: ${userName}`);

      return res.status(500).json({ success: false });
    }

    const isAuthorised = await user.checkPassword(password);

    if (isAuthorised) {
      req.session.save(() => {
        req.session.isLoggedIn = true;
        req.session.user = user.getUser();
        return res.json({ success: true });
      });
    } else {
      console.log(`[ERROR]: Failed to login | Incorrect password for email: ${userName}`);

      return res.status(500).json({ success: false });
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to login | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const signup = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ where: { userName } });

    if (user) {
      console.log(
        `[ERROR]: Failed to create user | Account already exists with email: ${userName}`
      );

      return res.status(500).json({ success: false });
    }

    await User.create({
      userName,
      password,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to create user | ${error.message}`);

    return res.status(500).json({ success: false });
  }
};

const logout = (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.destroy(() => {
      return res.status(204).end();
    });
  } else {
    return res.status(404).end();
  }
};

module.exports = {
  login,
  signup,
  logout,
};
