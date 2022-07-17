const { User } = require("../models");

const userData = [
  {
    userName: "tAlex",
    password: "abcd123",
  },
  {
    userName: "tSmith",
    password: "abcd123",
  },
  {
    userName: "jSmith",
    password: "abcd1234",
  },
];

const seedUUsers = () => User.bulkCreate(userData);

module.exports = seedUUsers;
