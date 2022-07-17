const Blog = require("./Blog");
const User = require("./User");

//blog always belongs to 1 user
Blog.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

//a user can have many blogs
User.hasMany(Blog, {
  foreignKey: "userId",
});

module.exports = { User, Blog };
