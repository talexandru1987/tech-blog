const { User } = require("../models");

const userData = [
  { username: "tAlex", password: "abcd123" },
  { username: "tSmith", password: "abcd123" },
  { username: "jSmith", password: "abcd1234" },
];

const seedUsers = async () => {
  const promises = userData.map((user) => User.create(user));

  await Promise.all(promises);

  console.log("Successfully seeded users");
};

module.exports = seedUsers;
