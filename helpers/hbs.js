const hbs = require("hbs");
const moment = require("moment");
const { options } = require("../app");

hbs.registerHelper("formatDate", function (date) {
  return moment(date).format("YYYY-MM-DD");
});

hbs.registerHelper("getArrLength", function (array) {
  return array.length;
});

hbs.registerHelper("isInArray", function (id, arrayofIds, option) {
  if (arrayofIds.includes(id)) {
    return option.fn(this);
  } else {
    return option.inverse(this);
  }
});
