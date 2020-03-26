var mongoose = require('mongoose');
var fileSchema = require('../schemas/file') //拿到导出的数据集模块
var File = mongoose.model('file', fileSchema) // 编译生成Movie 模型

module.exports = File