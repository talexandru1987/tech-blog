const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");

//blog always belongs to 1 user
Blog.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

//a user can have many blogs
User.hasMany(Blog, {
  foreignKey: "userId",
});

//a comment always belongs to only 1 user
Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

//a user can create many comments
User.hasMany(Comment, {
  foreignKey: "userId",
});

//a comment always belongs to 1 parent post
Comment.belongsTo(Blog, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

//a post can have many comments
Blog.hasMany(Comment, {
  foreignKey: "postId",
});

module.exports = { User, Blog, Comment };
