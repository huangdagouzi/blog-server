var mongoose = require('mongoose');
var usersSchema = require('../schemas/users') //拿到导出的数据集模块
var Users = mongoose.model('Users', usersSchema) // 编译生成Movie 模型

module.exports = Users