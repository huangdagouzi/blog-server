var express = require("express");
var router = express.Router();
var Articles = require("../modules/articles"); //导入模型数据模块

//根据_id查询单个数据
router.get("/", function(req, res, next) {
  Articles.findOne({ _id: req.query.id }, (err, articles) => {
    if (err) {
      res.send({
        code: 400,
        message: "查询失败",
        data: articles
      });
    } else {
      res.send({
        code: 200,
        message: "操作成功",
        data: articles
      });
    }
  });
});

//查询所有数据
router.get("/list", function(req, res, next) {
  let pageSize = req.query.pageSize || 20; //分页参数
  let currentPage = req.query.currentPage || 1; //当前页码
  // let params = {
  //   //条件查询参数
  //   title: req.query.key
  // };
  let query = new RegExp(req.query.key, 'i');
  // let mp = {};
  // for (let i in params) {
  //   if (params[i] !== undefined) {
  //     mp[i] = params[i];
  //   }
  // }
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
    Articles.find({$or:[{"title": query}]})
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

//新增数据
router.post("/add", function(req, res, next) {
  const blog = new Articles(req.body);
  blog.save((err, docs) => {
    if (err) {
      res.send({
        code: 400,
        message: "添加数据出错"
      });
    } else {
      res.send({
        code: 200,
        message: "操作成功"
      });
    }
  });
});

//删除
router.get("/del", function(req, res, next) {
  Articles.deleteOne({ _id: req.query.id }, (err, doc) => {
    if (err) {
      res.send({
        code: 400,
        message: "删除数据出错"
      });
    } else {
      res.send({
        code: 200,
        message: "操作成功"
      });
    }
  });
});

router.post("/update", function(req, res, next) {
  Articles.updateOne({ _id: req.body._id }, req.body, (err, doc) => {
    if (err) {
      res.send({
        code: 400,
        message: "更新数据出错"
      });
    } else {
      res.send({
        code: 200,
        message: "操作成功"
      });
    }
  });
});

module.exports = router;
