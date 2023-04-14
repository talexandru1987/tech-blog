const { Blog } = require("../models");

const blogData = [
  {
    title: "Art",
    description: "Something about art that makes it special",
    userId: "1",
  },
  {
    title: "Science",
    description: "Something BHN about science that makes it special",
    userId: "1",
  },
  {
    title: "Music",
    description: "Something about music that makes it special",
    userId: "1",
  },
  {
    title: "Coding",
    description: "something about coding that makes it very special",
    userId: "2",
  },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
