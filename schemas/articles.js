var mongoose = require('mongoose');

//申明一个mongoons对象
var articleSchema = new mongoose.Schema({
  'title': String,
  'publishTime': Number,
  'type': String,
  'content': String
})

//每次执行都会调用,时间更新操作
// UsersSchema.pre('save', function(next) {
//     if(this.isNew) {
//         this.meta.createAt = this.meta.updateAt = Date.now();
//     }else {
//         this.meta.updateAt = Date.now();
//     }

//     next();
// })

//查询的静态方法
articleSchema.statics = {
    fetch: function(cb) { //查询所有数据
        return this
          .find()
          .exec(cb) //回调
    },
    findById: function(id, cb) { //根据id查询单条数据
        return this
          .findOne({_id: id})          
          .exec(cb)
    }
}

//暴露出去的方法
module.exports = articleSchema