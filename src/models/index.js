const Blog = require("./Blog");
const User = require("./User");

Blog.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(Blog, {
  foreignKey: "userId",
});

module.exports = { User, Blog };
