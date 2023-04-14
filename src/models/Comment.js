const { Model, DataTypes } = require("sequelize");

const connection = require("../config/connection");
const Blog = require("./Blog");
const User = require("./User");

class Comment extends Model {
  getPost() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
    };
  }
}

const schema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  commentText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Blog,
      key: "id",
    },
  },
};

const options = {
  sequelize: connection,
  timestamps: true,
  underscored: false,
  freezeTableName: true,
  modelName: "comment",
};

Comment.init(schema, options);

module.exports = Comment;
