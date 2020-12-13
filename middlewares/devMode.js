module.exports = (req, res, next) => {
  req.session.currentUser = {
    _id: "5fd34a2bef79d64608a65576", // change the user id here to fit yor needs
    username: "Anoleboss",
    avatar: "https://cdn.onlinewebfonts.com/img_258083.png",
    role: "admin",
    email: "anoleboss@leboss.com",
  };
  next();
};
