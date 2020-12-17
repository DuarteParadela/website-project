module.exports = (req, res, next) => {
  req.session.currentUser = {
    _id: "5fdbe1aa20cbbd2de84445f5", // change the user id here to fit yor needs
    name: "admin",
    // avatar: "https://cdn.onlinewebfonts.com/img_258083.png",
    style: "admin",
    role: "admin",
    email: "admin@admin.admin",
    age: "2020-12-17",
  };
  next();
};
