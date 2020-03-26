var express = require("express");
var router = express.Router();
var File = require("../modules/file"); //导入模型数据模块
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  // destination:'public/uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
  destination(req, res, cb) {
    cb(null, "public/uploads/");
  },
  filename(req, file, cb) {
    const filenameArr = file.originalname.split(".");
    cb(null, Date.now() + "." + filenameArr[filenameArr.length - 1]);
  }
});

var upload = multer({ storage });

//新增数据
router.post("/uploadBanner", upload.single("file"), (req, res, next) => {
  console.log(req.file.filename);
  const file = new File({
    address: req.file.filename,
    originName: req.file.originalname
  });
  file.save((err, docs) => {
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

router.get("/bannerList", (req, res, next) => {
  File.find({}, (err, file) => {
    if (err) {
      res.send({
        code: 400,
        message: "查询数据出错"
      });
    } else {
      res.send({
        code: 200,
        message: "查询成功",
        data: file
      });
    }
  });
});

// 删除
router.get("/delBanner", function(req, res, next) {
  File.deleteOne({ _id: req.query.id }, (err, doc) => {
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

// router.post("/update", function(req, res, next) {
//   Articles.updateOne({ _id: req.body._id }, req.body, (err, doc) => {
//     if (err) {
//       res.send({
//         code: 400,
//         message: "更新数据出错"
//       });
//     } else {
//       res.send({
//         code: 200,
//         message: "操作成功"
//       });
//     }
//   });
// });

module.exports = router;
