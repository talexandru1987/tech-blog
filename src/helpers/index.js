const dateFns = require("date-fns");

const isEqualTo = (data, equalToString) => {
  return data === equalToString;
};

const formatDate = (date) => {
  const formattedDate = dateFns.format(new Date(date), "do MMMM, yyyy");
  return formattedDate;
};

module.exports = {
  isEqualTo,
  formatDate,
};
