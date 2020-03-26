var express = require("express");
var router = express.Router();
var Articles = require("../modules/articles"); //导入模型数据模块
var Files = require("../modules/file");

//查询所有数据
router.get("/list", function(req, res, next) {
  let pageSize = req.query.pageSize || 5; //分页参数
  let currentPage = req.query.currentPage || 1; //当前页码
  let params = {
    //条件查询参数
    type: req.query.type
  };
  let mp = {};
  for (let i in params) {
    if (params[i] !== undefined) {
      mp[i] = params[i];
    }
  }
  if (currentPage < 1) {
    currentPage = 1;
  }
  Articles.find({}, (err, articles) => {
    if (err) {
      res.send({
        code: 400,
        message: "查询数据出错"
      });
    }
    let total = articles.length;
    Articles.find({ ...mp })
      .skip((parseInt(currentPage) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize))
      .exec((err, articles) => {
        if (err) {
          res.send({
            code: 400,
            message: "查询数据出错"
          });
        } else {
          res.send({
            code: 200,
            message: "操作成功",
            total: total,
            data: articles
          });
        }
      });
  });
});

router.get("/banner", function(req, res, next) {
  Files.find({}, (err, files) => {
    if (err) {
      res.send({
        code: 400,
        message: "查询数据出错"
      });
    } else {
      res.send({
        code: 200,
        message: "操作成功",
        data: files
      });
    }
  });
});

module.exports = router;
