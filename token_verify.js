const jwt = require("jsonwebtoken");
const SECRET = "huang_he_shen";

exports.setToken = function(_id) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(
      {
        id: _id
      },
      SECRET,
      { expiresIn: "0.5h" }
    );
    resolve(token);
  });
};

exports.verToken = function(token) {
  return new Promise((resolve, reject) => {
    var info = jwt.verify(token.split(" ")[1], SECRET);
    console.log(123123)
    resolve(info);
  });
};
