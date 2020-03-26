var mongoose = require('mongoose');

//申明一个mongoons对象
var bannerSchema = new mongoose.Schema({
  'index': Number,
  'address': String,
  'originName': String
})

//暴露出去的方法
module.exports = bannerSchema