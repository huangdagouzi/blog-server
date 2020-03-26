var mongoose = require('mongoose');
var articleSchema = require('../schemas/articles') //拿到导出的数据集模块
var Articles = mongoose.model('Articles', articleSchema) // 编译生成Movie 模型

module.exports = Articles