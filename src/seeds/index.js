const seedBlogs = require("./Blog");
const seedUsers = require("./User");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedBlogs();
  console.log("\n-----  BLOGS SEEDED -----\n");

  process.exit(0);
};

seedAll();
