const { Comment } = require("../models");

const commentsData = [
  {
    commentText: "Yes, I agree!",
    userId: 2,
    postId: 1,
  },
  {
    commentText: " really good!",
    userId: 1,
    postId: 1,
  },
  {
    commentText: " cover a wide variety of topics",
    userId: 2,
    postId: 1,
  },
  {
    commentText: "I recommend it!",
    userId: 2,
    postId: 2,
  },
  {
    commentText: "maybe",
    userId: 1,
    postId: 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentsData);

module.exports = seedComments;
