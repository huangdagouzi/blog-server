var express = require("express");
var router = express.Router();
var Users = require("../modules/users"); //导入模型数据模块
var Token = require("../token_verify"); //引入token封装函数

router.post("/register", async (req, res, next) => {
  console.log(req.body);
  let user = Users.create({
    username: req.body.username,
    password: req.body.password
  });
  res.send(user);
});

router.post("/login", async (req, res, next) => {
  const user = await Users.findOne({
    username: req.body.username
  });
  if (!user) {
    return res.send({
      code: 400,
      message: "用户不存在"
    });
  }
  // bcrypt.compareSync 解密匹配，返回 boolean 值
  const isPasswordValid = require("bcryptjs").compareSync(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(200).send({
      code: 400,
      message: "密码错误"
    });
  } else {
    Token.setToken(user._id).then((data) => {
      res.send({
        code: 200,
        message: "登陆成功",
        token: data
      });
    })
  }
});

module.exports = router;
